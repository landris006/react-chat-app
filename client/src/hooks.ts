import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getMessages } from './api/messages';
import { fetchMessages } from './reducers/messages';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useErrorMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    sendError: (error: any) => {
      let message =
        error.response?.data?.error?.message ??
        error.message ??
        'An error occured...';

      if (typeof error === 'string') {
        message = error;
      }

      enqueueSnackbar(message, {
        variant: 'error',
      });
      console.error(error);
    },
  };
};
