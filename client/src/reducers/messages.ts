import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Array<Message> = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Array<Message>>) => {
      console.log(action.payload);

      action.payload.forEach((message) => {
        state.push(message);
      });
    },
  },
});

export const { newMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
