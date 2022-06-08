import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography variant="h2" paddingX={2}>
          Epikus messenger klón
        </Typography>
        <Link to="/authentication" className="login-button">
          <Button variant="contained" size="large">
            login
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
