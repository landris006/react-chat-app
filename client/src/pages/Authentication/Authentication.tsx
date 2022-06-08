import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './Authentication.scss';

const Authentication = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="wrapper auth-container">
      <Card className="auth-card" raised>
        <Typography variant="h2">{isSignup ? 'Sign Up' : 'Login'}</Typography>
        <form>
          <TextField required margin="normal" label="username" fullWidth />
          <TextField
            required
            margin="normal"
            label="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isSignup ? (
            <TextField
              type={'password'}
              required
              margin="normal"
              label="verify password"
              fullWidth
            />
          ) : null}
          <Button
            type="submit"
            fullWidth
            className="auth-button"
            variant="contained"
          >
            {isSignup ? 'sign up' : 'login'}
          </Button>
        </form>
        <Typography variant="subtitle1">
          {isSignup
            ? 'Already have an account? Login '
            : "Don't have an account? Sign up "}
          <span
            onClick={() => setIsSignup((current) => !current)}
            color="primary"
          >
            here!
          </span>
        </Typography>
      </Card>
    </div>
  );
};

export default Authentication;
