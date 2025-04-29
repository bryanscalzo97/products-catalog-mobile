import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../models';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeScreenNavigationProp, RootStackParamList } from '../../models';
import {
  useGetProductsInfinite,
  useGetCategories,
} from '../../api/productsApi';
import { Ionicons } from '@expo/vector-icons';
import { FilterState, FilterModalState } from '../../models';
import { styles } from './HomeScreenStyles';
import { FilterModal } from './components/FilterModals/FilterModal';
import { FlashList } from '@shopify/flash-list';
import { useFilters } from './hooks/useFilters';
import { ProductCard } from './components/ProductCard/ProductCard';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const {
    filters,
    setFilters,
    modalState,
    setModalState,
    openFilterModal,
    applyFilters,
    updateModalFilter,
  } = useFilters();

  // If a category is provided in the route params (deep link), update the modal state and filters.
  useEffect(() => {
    if (route.params?.category) {
      const category = route.params.category;
      setModalState((prev: FilterModalState) => ({
        ...prev,
        category,
      }));
      setFilters((prev: FilterState) => ({
        ...prev,
        category,
      }));
    }
  }, [route.params?.category]);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProductsInfinite(filters);

  const { data: categories } = useGetCategories();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const products = data?.pages.flatMap((page) => page.products) || [];

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
          <Ionicons name='filter' size={24} color='#666' />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlashList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        estimatedItemSize={361}
      />

      {/* Filter Modal */}
      <FilterModal
        isVisible={modalState.isVisible}
        onClose={() => setModalState({ ...modalState, isVisible: false })}
        onApply={applyFilters}
        categories={categories || []}
        modalState={modalState}
        onUpdateFilter={updateModalFilter}
      />
    </View>
  );
};
