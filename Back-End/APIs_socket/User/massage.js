const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const redis = require('redis');
const client = redis.createClient();

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
    console.log(data);
    client.sismember("online_users", friend_id, (err, isOnline) => {
      if (err) throw err;
      if (isOnline) {
        // console.log("User is online");
        io.to(user_id).emit('message', { newMessage, newChat });
        io.to(friend_id).emit('message', { newMessage, newChat });
      }
      else {
        // console.log("User is not online" );
        io.to(user_id).emit('message', { newMessage, newChat });
      }
    });
  });
}
