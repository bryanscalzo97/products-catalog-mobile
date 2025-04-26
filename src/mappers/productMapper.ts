import { Product } from '../models/Product';

// DummyJSON API response type
export type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  brand: string;
  rating: number;
  stock: number;
  discountPercentage: number;
};

// DummyJSON API response structure
export type ApiProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

// Transform API response to domain model
export const mapApiProductToDomain = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category,
    image: apiProduct.thumbnail, // Usamos thumbnail como imagen principal
    rating: {
      rate: apiProduct.rating,
      count: apiProduct.stock, // Usamos stock como count
    },
  };
};

// Transform array of API products to domain models
export const mapApiProductsToDomain = (
  apiProducts: ApiProduct[]
): Product[] => {
  return apiProducts.map(mapApiProductToDomain);
};
