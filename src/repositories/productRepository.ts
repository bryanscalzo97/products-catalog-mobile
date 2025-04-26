import { axiosInstance } from '../services/APIClient';
import { Product } from '../models/Product';
import { ApiProduct, mapApiProductsToDomain } from '../mappers/productMapper';

export const productRepository = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<ApiProduct[]>('/products');
    return mapApiProductsToDomain(response.data);
  },
};
