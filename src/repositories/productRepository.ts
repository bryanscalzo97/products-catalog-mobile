import { axiosInstance } from '../services/APIClient';
import { mapApiProductToDomain } from '../mappers/productMapper';
import { Product } from '../models';

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
    // Initialize the base URL
    let url = '/products';
    const queryParams = new URLSearchParams();

    // If category is provided, add it to the URL
    if (params?.category) {
      url = `/products/category/${params.category}`;
    }

    // If sortBy is provided, add it to the query parameters
    if (params?.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }

    // If order is provided, add it to the query parameters
    if (params?.order) {
      queryParams.append('order', params.order);
    }

    // If limit is provided, add it to the query parameters
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    // If skip is provided, add it to the query parameters
    if (params?.skip) {
      queryParams.append('skip', params.skip.toString());
    }

    // Construct the full URL by concatenating the base URL and the query string
    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // Fetch the products from the API
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
