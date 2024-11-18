import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from '../store/chatws/chatSlice';
import usersReducer from '../store/users/usersSlice';
import groupReducer from '../store/groups/groupSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    users: usersReducer,
    groups: groupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
