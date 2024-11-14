import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// export type ChatSliceT = {
//     users: UserData[],
//     messages: MessageT[],
// }

const initialState = {
  users: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, addMessage } = chatSlice.actions;

export default chatSlice.reducer;