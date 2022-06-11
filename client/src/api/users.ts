import axios from 'axios';

const url = 'http://localhost:5000/users';

export const login = async (loginData: {
  username: string;
  password: string;
}) => {
  const res = await axios.post<User>(`${url}/login`, loginData);
  return res.data;
};

export const signUp = async (signUpData: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await axios.post<User>(`${url}/sign-up`, signUpData);
  return res.data;
};
