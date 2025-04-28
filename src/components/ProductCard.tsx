import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Product } from '../models/Product';
import { Image } from 'expo-image';

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

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardPressed: {
    backgroundColor: '#FAFAFA',
    transform: [{ scale: 0.985 }],
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  info: {
    padding: 16,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 15,
    color: '#484848',
    marginBottom: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#484848',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#767676',
  },
  categoryContainer: {
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    color: '#179185',
    textTransform: 'capitalize',
    backgroundColor: '#F4FAFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
