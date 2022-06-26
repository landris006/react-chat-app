import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types/Message';
import { Room } from '../types/Room';

const initialState: {
  messages: Message[];
  rooms: Room[];
} = {
  messages: [],
  rooms: [],
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
