import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatReducer from './chatws/chatSlice';
import postReducer from './wall/postsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
