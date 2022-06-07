import { Delete } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" paddingX={2}>
          Epikus messenger klón
        </Typography>
        <Button
          variant="text"
          size="large"
          sx={{ marginLeft: 'auto', color: 'white' }}
        >
          login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
