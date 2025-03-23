import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/ToastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
})

export default store;

