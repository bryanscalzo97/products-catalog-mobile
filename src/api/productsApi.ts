import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
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

export const useGetProductsInfinite = (
  params: Omit<GetProductsParams, 'skip'>
) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await productRepository.getProducts({
        ...params,
        skip: pageParam,
        limit: 10,
      });
      return { products: response, nextPage: pageParam + 10 };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productRepository.getProductById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
