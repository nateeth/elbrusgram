import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatReducer from './chatws/chatSlice';

import userReducer from './users/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
