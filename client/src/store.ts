import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import messagesReducer from './reducers/messages';
import usersReducer from './reducers/users';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
