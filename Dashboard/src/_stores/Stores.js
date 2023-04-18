import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './Slices/admin.js';

export const store = configureStore({
  reducer: {
    admin_Store: adminSlice,
  },
})
