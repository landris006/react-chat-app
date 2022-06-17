import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types/Message';

const initialState: {
  messages: Message[];
} = {
  messages: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    fetchMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { newMessage, fetchMessages } = conversationSlice.actions;
export default conversationSlice.reducer;
