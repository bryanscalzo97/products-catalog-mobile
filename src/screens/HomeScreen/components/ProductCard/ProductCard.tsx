import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Product } from '../../../../models/Product';
import { Image } from 'expo-image';
import { styles } from './ProductCardStyles';

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, onPress }) => {
    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => onPress(product)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit='contain'
          />
        </View>
        <View style={styles.info}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toLocaleString()}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
            <Text style={styles.reviews}>({product.rating.count} reviews)</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
);
