import { Product } from '../models/Product';

// API response type
export type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Transform API response to domain model
export const mapApiProductToDomain = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category,
    image: apiProduct.image,
    rating: apiProduct.rating,
  };
};

// Transform array of API products to domain models
export const mapApiProductsToDomain = (
  apiProducts: ApiProduct[]
): Product[] => {
  return apiProducts.map(mapApiProductToDomain);
};
