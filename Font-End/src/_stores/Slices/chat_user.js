import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
};
const combineWithoutDuplicates = (arr1, arr2) => {
    return arr1.concat(arr2).reduce((result, item) => {
        if (!result.some(existingItem => existingItem.user_id === item.user_id)) {
            result.push(item);
        }
        return result;
    }, []);
};

const UsersSlice = createSlice({
    name: 'Users-Data',
    initialState,
    reducers: {
        CREATE_CHAT_USERS: (state, action) => {
            const temp = combineWithoutDuplicates(state.users, action.payload);
            state.users = temp;
        },
        UPDATE_CHAT_USERS: (state, action) => {
            const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
            state.users[index] = action.payload;
        },
        DELETE_CHAT_USERS: (state, action) => {
            state.users = state.users.filter(user => user.user_id !== action.payload);
        },
        CLEAR_CHAT_USERS: (state, action) => {
            state.users = [];
        }
    },
});
export const { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } = UsersSlice.actions;
export default UsersSlice.reducer;

