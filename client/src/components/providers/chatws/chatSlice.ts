import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataType } from '../../../schemas/authSchema';
import { MessageT } from '../../../schemas/messageSchema';

export type ChatSliceT = {
  users: UserDataType[];
  messages: MessageT[];
};

const initialState: ChatSliceT = {
  users: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserDataType[]>) => {
      state.users = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessageT>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<MessageT[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setUsers, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
