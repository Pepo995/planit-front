import axios from 'axios';
import { RegisterValidationInterface } from '../views/Register';
import { LoginValidationInterface } from '../views/Login';
import { UpdateValidationInterface } from '../views/PersonalInformation';

const usersApi = axios.create({
  baseURL: `http://localhost:4000/users`,
});

export const getUsers = async () => {
  const { data } = await usersApi.get('/');
  return data;
};

export const getUserById = async (id: any) => {
  const { data } = await usersApi.get(`/${id}`);
  return data;
};

export const createUser = (registerData: RegisterValidationInterface) => usersApi.post('/register', registerData);

export const login = (loginData: LoginValidationInterface) => usersApi.post('/login', loginData);

export const modifyUser = (updateData: UpdateValidationInterface, id: any) => usersApi.put(`/${id}`, updateData);
