import axios from 'axios';

const url = 'http://localhost:5000/auth';

export const login = async (loginData: {
  username: string;
  password: string;
}) => {
  await axios.post(`${url}/login`, loginData);
};

export const signUp = (signUpData: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  axios.post(`${url}/login`, signUpData);
};
