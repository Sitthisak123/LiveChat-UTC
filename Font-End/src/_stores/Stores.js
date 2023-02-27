import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Slices/user.js';
import ConversationSlice from './Slices/chat_conversation.js';
import UsersSlice from './Slices/chat_user.js';
import ChatMsgSlice from './Slices/chat_msg.js';
import Friends_Status from './Slices/Friends_Status.js';
export const store = configureStore({
  reducer: {
    User_data: UserSlice,
    Chat_data_conversation: ConversationSlice,
    Chat_data_users: UsersSlice,
    Chat_data_msg: ChatMsgSlice,
    Friends_relation: Friends_Status
  },
})
