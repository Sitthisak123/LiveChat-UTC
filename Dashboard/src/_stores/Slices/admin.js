import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin_data: [],
}

export const UserSlice = createSlice({
    name: 'User-Data',
    initialState,
    reducers: {
        CREATE_ADMIN: (state, action) => {
            state.admin_data = action.payload
        },
        UPDATE_ADMIN: (state, action) => {
            state.admin_data = {...state.admin_data, ...action.payload}
        },
        DELETE_ADMIN: (state) => {
            state.admin_data = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN } = UserSlice.actions

export default UserSlice.reducer