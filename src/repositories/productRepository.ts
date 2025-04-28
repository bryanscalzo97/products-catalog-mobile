import { axiosInstance } from '../services/APIClient';
import { mapApiProductToDomain } from '../mappers/productMapper';
import { Product } from '../models/Product';

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type GetProductsParams = {
  category?: string;
  sortBy?: 'price' | 'rating';
  order?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
};

export const productRepository = {
  getProducts: async (params?: GetProductsParams): Promise<Product[]> => {
    let url = '/products';
    const queryParams = new URLSearchParams();

    if (params?.category) {
      url = `/products/category/${params.category}`;
    }

    if (params?.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }

    if (params?.order) {
      queryParams.append('order', params.order);
    }

    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    if (params?.skip) {
      queryParams.append('skip', params.skip.toString());
    }

    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await axiosInstance.get(fullUrl);
    const products = response.data.products || [];
    return products.map(mapApiProductToDomain);
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return mapApiProductToDomain(response.data);
  },
};
