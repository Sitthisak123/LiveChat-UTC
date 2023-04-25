import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chat_msg: [],
};
const combineWithoutDuplicates = (arr1, arr2) => {
    return arr1.concat(arr2).reduce((result, item) => {
        if (!result.some(existingItem => existingItem.msg_reply_id === item.msg_reply_id)) {
            result.push(item);
        }
        return result;
    }, []);
};

export const ChatMsgSlice = createSlice({
    name: 'ChatMsg-Data',
    initialState,
    reducers: {
        CREATE_CHAT_MSG: (state, action) => {
            const temp = combineWithoutDuplicates(state.chat_msg, action.payload);
            state.chat_msg = temp;
        },
        UPDATE_CHAT_MSG: (state, action) => {
            const index = state.chat_msg.findIndex(msg => msg.msg_reply_id === action.payload.msg_reply_id);
            state.chat_msg[index] = {...state.chat_msg[index], ...action.payload};
        },
        DELETE_CHAT_MSG: (state, action) => {
            state.chat_msg = state.chat_msg.filter(msg => msg.msg_reply_id !== action.payload);
        },
        DELETE_CHAT_MSG_BY_CID: (state, action) => {
            state.chat_msg = state.chat_msg.filter(msg => msg.fk_chat_id !== action.payload);
        },
        CLEAR_CHAT_MSG: (state, action) => {
            state.chat_msg = [];
        }
    },
});
export const { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG, DELETE_CHAT_MSG_BY_CID } = ChatMsgSlice.actions;
export default ChatMsgSlice.reducer;
