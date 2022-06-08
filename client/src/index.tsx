import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import App from './App';
import Slide from '@mui/material/Slide/Slide';
import Button from '@mui/material/Button/Button';

const container = document.getElementById('root')!;
const root = createRoot(container);

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
  notistackRef?.current?.closeSnackbar(key);
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Slide}
        action={(key) => (
          <Button
            style={{ color: 'white' }}
            variant="text"
            onClick={onClickDismiss(key)}
          >
            close
          </Button>
        )}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
