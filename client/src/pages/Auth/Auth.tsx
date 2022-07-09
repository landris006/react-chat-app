import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { login, loginWithToken, signUp } from '../../api/users';
import { useSnackbar } from 'notistack';
import './Auth.scss';
import { useAppDispatch, useErrorMessage } from '../../hooks';
import { setCurrentUser } from '../../reducers/users';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const { enqueueSnackbar } = useSnackbar();
  const { sendError } = useErrorMessage();

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
      sendError('Please fill in the required fields!');
      return;
    }

    if (!isSignup) {
      try {
        const user = await login({ username, password });
        dispatch(setCurrentUser(user));
        navigate('/everyone');
        enqueueSnackbar('Successful login!', { variant: 'success' });
      } catch (error) {
        sendError(error);
      }
      return;
    }

    if (password !== confirmPassword) {
      setEmptyFields({ ...emptyFields, password: true, confirmPassword: true });
      sendError('Passwords do not match...');
      return;
    }

    try {
      const user = await signUp(formData);
      dispatch(setCurrentUser(user));
      navigate('/everyone');
      enqueueSnackbar('Successful signup!', { variant: 'success' });
    } catch (error) {
      sendError(error);
    }
  };

  useEffect(() => {
    loginWithToken()
      .then((user) => {
        dispatch(setCurrentUser(user));
        navigate('/everyone');
        enqueueSnackbar('Successful login!', { variant: 'success' });
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <div className="wrapper ">
      <Container className="auth-container">
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
      </Container>
    </div>
  );
};

export default Auth;
