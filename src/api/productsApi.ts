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
        skip: pageParam * 20,
        limit: 20,
      });
      return {
        products: response,
        nextPage: response.length === 20 ? pageParam + 1 : undefined,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1,
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
