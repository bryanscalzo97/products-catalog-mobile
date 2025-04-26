import { Product } from '../models/Product';
import { useQuery } from '@tanstack/react-query';
import { productRepository } from '../repositories/productRepository';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productRepository.getProducts(),
  });
};
