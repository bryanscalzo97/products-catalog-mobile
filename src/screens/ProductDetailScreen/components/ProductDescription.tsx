import React from 'react';
import { View, Text } from 'react-native';
import { Product } from '../../../models/Product';
import { styles } from '../ProductDetailScreenStyles';

type ProductDescriptionProps = {
  product: Product;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About this product</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};
