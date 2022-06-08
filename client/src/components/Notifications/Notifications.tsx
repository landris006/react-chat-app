import { Fade, Slide, Snackbar } from '@mui/material';
import React from 'react';
import Alert from './Alert/Alert';

const Notifications = () => {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={Slide}
    >
      <Alert severity="success">This is a success message!</Alert>
    </Snackbar>
  );
};

export default Notifications;
