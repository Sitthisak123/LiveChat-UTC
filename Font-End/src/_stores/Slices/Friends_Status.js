import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Friend_data: []
};
const combineWithoutDuplicates = (arr1, arr2) => {
    return arr1.concat(arr2).reduce((result, item) => {
        if (!result.some(existingItem => existingItem.msg_reply_id === item.msg_reply_id)) {
            result.push(item);
        }
        return result;
    }, []);
};

export const FriendsStatusSlice = createSlice({
    name: 'ChatMsg-Data',
    initialState,
    reducers: {
        CREATE_FRIENDS_STATUS: (state, action) => {
            const temp = combineWithoutDuplicates(state.Friend_data, action.payload);
            state.Friend_data = temp;
        },
        UPDATE_FRIENDS_STATUS: (state, action) => {
            const index = state.chat_msg.findIndex(Friend => Friend.relation_id === action.payload.msg_reply_id);
            state.Friend_data[index] = action.payload;
        },
        DELETE_FRIENDS_STATUS: (state, action) => {
            state.Friend_data = state.chat_msg.filter(Friend => Friend.relation_id !== action.payload);
        },
        CLEAR_FRIENDS_STATUS: (state, action) => {
            state.Friend_data = [];
        }
    },
});
export const { CREATE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_CHAT_MSG } = FriendsStatusSlice.actions;
export default FriendsStatusSlice.reducer;
