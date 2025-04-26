import { axiosInstance } from '../services/APIClient';
import { Product } from '../models/Product';
import {
  ApiProductsResponse,
  mapApiProductsToDomain,
} from '../mappers/productMapper';

export const productRepository = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<ApiProductsResponse>('/products');
    return mapApiProductsToDomain(response.data.products);
  },
};
