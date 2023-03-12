import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    conversation: []
};

const combineWithoutDuplicates = (arr1, arr2) => {
    return arr1.concat(arr2).reduce((result, item) => {
        if (!result.some(existingItem => existingItem.chat_id === item.chat_id)) {
            result.push(item);
        }
        return result;
    }, []);
};

export const ConversationSlice = createSlice({
    name: 'Conversation-Data',
    initialState,
    reducers: {
        CREATE_CONVERSATION: (state, action) => {
            const temp = combineWithoutDuplicates(state.conversation, action.payload);
            state.conversation = temp;
        },
        UPDATE_CONVERSATION: (state, action) => {
            const index = state.conversation.findIndex(conversation => conversation.chat_id === action.payload.chat_id);
            state.conversation[index] = {...state.conversation[index], ...action.payload};
        },
        DELETE_CONVERSATION: (state, action) => {
            state.conversation = state.conversation.filter(conversation => conversation.chat_id !== action.payload);
        },
        CLEAR_CONVERSATION: (state, action) => {
            state.conversation = [];
        }
    },
});

export const { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } = ConversationSlice.actions;
export default ConversationSlice.reducer;
