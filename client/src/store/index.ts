import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from '../store/chatws/chatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
