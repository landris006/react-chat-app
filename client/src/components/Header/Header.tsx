import {
  AppBar,
  Avatar,
  Button,
  ClickAwayListener,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../reducers/users';
import './Header.scss';

const Header = () => {
  const currentUser = useAppSelector(({ users }) => users.currentUser);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography variant="h2" paddingX={2}>
          Epikus messenger klón
        </Typography>
        {currentUser && (
          <div className="logged-in-user">
            <Typography alignItems={'center'} variant="body1" paddingX={2}>
              {'Logged in as '}
              <span className="username">{currentUser.username}</span>
            </Typography>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div className="menu-container">
                <IconButton onClick={() => setOpen((open) => !open)}>
                  <Avatar>{currentUser.username.charAt(0)}</Avatar>
                </IconButton>
                {open && (
                  <Paper elevation={6} className="user-menu">
                    <Stack spacing={1}>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>Settings</MenuItem>
                      <div className="button-wrapper">
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() => dispatch(logout())}
                        >
                          logout
                        </Button>
                      </div>
                    </Stack>
                  </Paper>
                )}
              </div>
            </ClickAwayListener>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
