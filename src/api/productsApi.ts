import { useQuery } from '@tanstack/react-query';
import {
  productRepository,
  GetProductsParams,
} from '../repositories/productRepository';

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productRepository.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes, because categories don't change often
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productRepository.getProductById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
