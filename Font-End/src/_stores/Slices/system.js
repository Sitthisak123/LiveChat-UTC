import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Suspend: {}
};

const SystemSlice = createSlice({
    name: 'System-Data',
    initialState,
    reducers: {
        CREATE_SUSPEND_STATUS: (state, action)=>{
            state.Suspend = action.payload;
        },
        CLEAR_SUSPEND_STATUS: (state, action)=>{
            state.Suspend = {};
        },
    }
});
export const { CREATE_SUSPEND_STATUS, CLEAR_SUSPEND_STATUS } = SystemSlice.actions;
export default SystemSlice.reducer;