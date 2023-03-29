import axios from 'axios';
import { z } from 'zod';

const productsApi = axios.create({
  baseURL: `http://localhost:4000/products`,
});

export const getProductsParams = z.object({
  name: z.string().nullable(),
  categories: z.number().array().nullable(),
  sortBy: z.string().nullable(),
  page: z.string().transform((val) => parseInt(val)),
  size: z.string().transform((val) => parseInt(val)),
});
export type GetProductsParams = z.infer<typeof getProductsParams>;

export const getProducts = async (params: GetProductsParams) => {
  const { data } = await productsApi.get('/', { params });
  return data;
};

productsApi.interceptors.request.use(
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
