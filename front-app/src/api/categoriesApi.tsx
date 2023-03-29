import axios from 'axios';

const categoriesApi = axios.create({
  baseURL: `http://localhost:4000/categories`,
});

export const getCategories = async () => {
  const { data } = await categoriesApi.get('/');
  return data;
};

categoriesApi.interceptors.request.use(
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
