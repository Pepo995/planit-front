import axios from 'axios';

const usersApi = axios.create({
  baseURL: `http://localhost:4000/users`,
});

export const getAuthenticatedUser = async () => {
  const { data } = await usersApi.get('/currentUser');
  return data;
};

usersApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
