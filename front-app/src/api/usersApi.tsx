import axios from 'axios';
import { RegisterValidationInterface } from '../views/Register';
import { LoginValidationInterface } from '../views/Login';

const usersApi = axios.create({
  baseURL: 'http://localhost:4000/users',
});

export const getUsers = async () => {
  const response = await usersApi.get('/');
  return response.data;
};

export const createUser = (user: RegisterValidationInterface) => usersApi.post('/register', user);

export const login = (user: LoginValidationInterface) => usersApi.post('/login', user);
