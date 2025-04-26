import { Product } from '../models/Product';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/APIClient';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => axiosInstance.get<Product[]>('/products'),
  });
};
