import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const UserSlice = createSlice({
    name: 'User-Data',
    initialState,
    reducers: {
        CREATE_USER: (state, action) => {
            state.value = action.payload
        },
        UPDATE_USER: (state, action) => {
            state.value = {...state.value, ...action.payload}
        },
        DELETE_USER: (state) => {
            state.value = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { CREATE_USER, UPDATE_USER, DELETE_USER } = UserSlice.actions

export default UserSlice.reducer