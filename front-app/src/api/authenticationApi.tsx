import axios from 'axios';

import { LoginValidationInterface } from '../views/Login';
import { RegisterValidationInterface } from '../views/Register';

const authenticationApi = axios.create({
  baseURL: `http://localhost:4000/users`,
});

export const createUser = (registerData: RegisterValidationInterface) =>
  authenticationApi.post('/register', registerData);

export const login = (loginData: LoginValidationInterface) => authenticationApi.post('/login', loginData);
