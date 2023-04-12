import axios from 'axios';
import { z } from 'zod';

const salesApi = axios.create({
  baseURL: `http://localhost:4000/sales`,
});

const checkoutValidationSchema = z.object({
  fullName: z.string(),
  deliveryDate: z.string(),
  direction: z.string(),
  contactNumber: z.number(),
  deliveryTime: z.string(),
  deliveryCost: z.number(),
  surprise: z.boolean(),
  forwarding: z.boolean(),
  productId: z.number(),
  amount: z.number(),
  totalWithTax: z.number(),
  tax: z.number(),
});
export type CheckoutValidationInterface = z.infer<typeof checkoutValidationSchema>;

export const createSale = (checkoutData: CheckoutValidationInterface) => salesApi.post('/', checkoutData);

salesApi.interceptors.request.use(
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
