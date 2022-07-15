import axios from 'axios';

const url = 'https://epic-react-chat-server.herokuapp.com/users';
const instance = axios.create({
  baseURL: 'https://epic-react-chat-server.herokuapp.com/users',
  withCredentials: true,
});

export const login = async (loginData: {
  username: string;
  password: string;
}) => {
  const res = await instance.post(`${url}/login`, loginData);

  localStorage.setItem('token', res.data.token);
  return res.data.user;
};

export const loginWithToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw Error('No token found locally...');
  }
  const res = await instance.post(`${url}/login-with-token`, {
    token: `Bearer ${token}`,
  });

  return res.data;
};

export const signUp = async (signUpData: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await instance.post(`${url}/sign-up`, signUpData);
  return res.data.newUser;
};
