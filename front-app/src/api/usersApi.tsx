import axios from 'axios';

import { LoginValidationInterface } from '../views/Login';
import { RegisterValidationInterface } from '../views/Register';

const usersApi = axios.create({
  baseURL: `http://localhost:4000/users`,
});

export const getUsers = async () => {
  const { data } = await usersApi.get('/');
  return data;
};

export const createUser = (registerData: RegisterValidationInterface) => usersApi.post('/register', registerData);

export const login = (loginData: LoginValidationInterface) => usersApi.post('/login', loginData);
