import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../models/Product';

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
});
