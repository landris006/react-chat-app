import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  everyUser: Array<User>;
  currentUser: User | null;
} = {
  everyUser: [],
  currentUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login } = usersSlice.actions;
export default usersSlice.reducer;
