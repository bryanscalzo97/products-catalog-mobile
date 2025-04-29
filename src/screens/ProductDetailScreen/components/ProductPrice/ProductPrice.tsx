import React from 'react';
import { View, Text } from 'react-native';
import { Product } from '../../../../models';
import { styles } from './ProductPriceStyles';

type ProductPriceProps = {
  product: Product;
};

export const ProductPrice: React.FC<ProductPriceProps> = ({ product }) => {
  const price = product.price.toFixed(2);
  const [dollars, cents] = price.split('.');

  return (
    <View style={styles.priceSection}>
      <Text style={styles.priceLabel}>Price</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${dollars}</Text>
        <Text style={styles.priceDecimals}>{cents}</Text>
      </View>
      <Text style={styles.stockLabel}>
        {product.rating.count > 0
          ? `Stock available (${product.rating.count} units)`
          : 'Out of stock'}
      </Text>
    </View>
  );
};
