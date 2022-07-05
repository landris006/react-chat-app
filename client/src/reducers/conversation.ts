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

    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
    },
  },
});

export const { newMessage, fetchMessages, setRooms, addRoom, removeRoom } =
  conversationSlice.actions;
export default conversationSlice.reducer;
