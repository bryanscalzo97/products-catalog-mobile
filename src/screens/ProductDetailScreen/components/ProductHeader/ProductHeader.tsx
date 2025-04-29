import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Product } from '../../../../models';
import { styles } from './ProductHeaderStyles';

type ProductHeaderProps = {
  product: Product;
};

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.categoryLabel}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name='star' size={18} color='#FFD700' />
            <Text style={styles.rating}>{product.rating.rate}</Text>
            <Text style={styles.ratingCount}>
              ({product.rating.count} reviews)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
