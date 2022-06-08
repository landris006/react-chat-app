import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { login, signUp } from '../../api/auth';
import { useSnackbar } from 'notistack';
import './Auth.scss';
import { AxiosError } from 'axios';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [emptyFields, setEmptyFields] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setEmptyFields({ ...emptyFields, [e.target.name]: false });
  };

  const handleSignUpOrLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    setEmptyFields({
      username: !Boolean(username),
      password: !Boolean(password),
      confirmPassword: !Boolean(confirmPassword),
    });

    if (!username || !password || (isSignup && !confirmPassword)) {
      enqueueSnackbar('Please fill in the required fields!', {
        variant: 'error',
      });
      return;
    }

    if (!isSignup) {
      try {
        await login({ username, password });
      } catch (error) {
        if (error instanceof AxiosError) {
          enqueueSnackbar(error.message, {
            variant: 'error',
            persist: true,
          });
        } else {
          enqueueSnackbar('An error occured!', {
            variant: 'error',
          });
        }

        console.log(error);
      }
      return;
    }

    if (password !== confirmPassword) {
      setEmptyFields({ ...emptyFields, password: true, confirmPassword: true });
      enqueueSnackbar('Passwords do not match!', {
        variant: 'error',
      });
      return;
    }

    try {
      await signUp(formData);
    } catch (error) {
      if (error instanceof AxiosError) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('An error occured!', {
          variant: 'error',
        });
      }

      console.log(error);
    }
  };

  return (
    <div className="wrapper auth-container">
      <Card className="auth-card" raised>
        <Typography variant="h2">{isSignup ? 'Sign Up' : 'Login'}</Typography>
        <form>
          <TextField
            required
            margin="normal"
            label="username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={(e) => handleInput(e)}
            error={emptyFields.username}
          />

          <TextField
            required
            margin="normal"
            label="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={formData.password}
            error={emptyFields.password}
            onChange={(e) => handleInput(e)}
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
              label="confirm password"
              name="confirmPassword"
              error={emptyFields.confirmPassword}
              onChange={(e) => handleInput(e)}
              fullWidth
            />
          ) : null}
          <Button
            type="submit"
            fullWidth
            className="auth-button"
            variant="contained"
            onClick={(e) => handleSignUpOrLogin(e)}
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

export default Auth;
