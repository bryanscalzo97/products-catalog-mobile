import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../models/Product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useGetProducts } from '../../api/productsApi';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {
    data: products,
    isLoading: loading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetProducts();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products?.data}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});
