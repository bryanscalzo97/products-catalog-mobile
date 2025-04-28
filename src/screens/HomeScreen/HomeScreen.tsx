import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../models/Product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetProducts, useGetCategories } from '../../api/productsApi';
import { Ionicons } from '@expo/vector-icons';
import { useFilters } from './useFilters';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './HomeScreenStyles';
import { FilterModal } from './components/FilterModal';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {
    filters,
    modalState,
    setModalState,
    openFilterModal,
    applyFilters,
    updateModalFilter,
  } = useFilters();

  const { data: categories } = useGetCategories();

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetProducts(filters);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  if (isLoading) {
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Ionicons name='options-outline' size={24} color='#666' />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />

      {/* Filter Modal */}
      <FilterModal
        isVisible={modalState.isVisible}
        onClose={() => setModalState((prev) => ({ ...prev, isVisible: false }))}
        onApply={applyFilters}
        categories={categories || []}
        modalState={modalState}
        onUpdateFilter={updateModalFilter}
      />
    </View>
  );
};
