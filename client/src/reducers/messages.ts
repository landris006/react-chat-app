import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Message[] = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },

    fetchMessages: (state, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
  },
});

export const { newMessage, fetchMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
