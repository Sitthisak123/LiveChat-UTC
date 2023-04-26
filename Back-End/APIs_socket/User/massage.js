const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const checkOnline = require('./../../_methods/Redis_methods.js');

module.exports = (io, socket, user_id) => {

  socket.on('message', async (data) => {
    const { msg, friend_id, chat_id } = data;
    var newMessage;
    var newChat;
    try {
      if (chat_id) {
        newMessage = await prisma.msg_user_reply.create({
          data: {
            fk_user_owner: user_id,
            fk_chat_id: chat_id,
            msg_reply_message: msg,
            msg_read: 0,
          },
        })
      } else {
        newChat = await prisma.chat_user.create({
          data: {
            chat_user_one: user_id,
            chat_user_two: friend_id,
          },
        });

        newMessage = await prisma.msg_user_reply.create({
          data: {
            fk_user_owner: user_id,
            fk_chat_id: newChat.chat_id,
            msg_reply_message: msg,
            msg_status: 0,
            msg_read: 0,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    if (checkOnline(friend_id)) {
      io.to(user_id).emit('message', { newMessage, newChat });
      io.to(friend_id).emit('message', { newMessage, newChat });
    } else {
      io.to(user_id).emit('message', { newMessage, newChat });
    }
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('Unsend-message', async (data) => {
    const { newStatus, msg_id } = data;
    const MSG_Status = { delete: 1, Unsend: 2 };
    if (Object.values(MSG_Status).includes(newStatus)) {
      try {
        const updateMSG = await prisma.msg_user_reply.findFirst({
          where: {
            msg_reply_id: msg_id,
          }
        })
        if (updateMSG) {
          let data = {}
          if (updateMSG.fk_user_owner === user_id) {
            data = {
              msg_status_owner: newStatus,
            }
          } else if (updateMSG.fk_user_owner !== user_id && newStatus === 1) {
            data = {
              msg_status_other: newStatus,
            }
          } else {
            io.to(user_id).emit('Unsend-message', { status: 403, text: "the new MSG Status has invalid" });
            return;
          }
          const updatedMessage = await prisma.msg_user_reply.update({
            where: {
              msg_reply_id: msg_id,
            },
            data
          });
          const FindChat = await prisma.chat_user.findFirst({
            where: {
              chat_id: updatedMessage.chat_id,
            }
          })
          const friend_id = FindChat.chat_user_one === user_id ? FindChat.chat_user_two : FindChat.chat_user_one;
          if (checkOnline(friend_id) && newStatus === MSG_Status.Unsend) {
            console.log("Online>: " + friend_id);
            io.to(friend_id).emit('Unsend-message', { status: 200, text: "Message status has Changed", UnsendMessage: { newStatus, msg_id } });
          }
          io.to(user_id).emit('Unsend-message', { status: 200, text: "Message status has Changed", UnsendMessage: { newStatus, msg_id } });
          return;
        } else {
          io.to(user_id).emit('Unsend-message', { status: 404, text: "Message not Found" });
          return;
        }
      } catch (err) {
        console.log(err);
        io.to(user_id).emit('Unsend-message', { status: 405, text: "error while update Message Status" });
      }
    } else {
      io.to(user_id).emit('Unsend-message', { status: 403, text: "invalid message status" });
      return;
    }
  });

}



// function checkOnline(user_id) {
//   const redis = require('redis');
//   const client = redis.createClient();
//   return new Promise((resolve, reject) => {
//     client.sismember("online_users", user_id, (err, isOnline) => {
//       if (err) throw err;
//       if (isOnline) {
//         resolve(true);
//       }
//       else {
//         resolve(false);
//       }
//     });
//   });
// }
