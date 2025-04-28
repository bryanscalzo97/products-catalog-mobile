import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ScrollView,
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
      <Modal
        visible={modalState.isVisible}
        animationType='slide'
        presentationStyle='pageSheet'
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setModalState((prev) => ({ ...prev, isVisible: false }))
              }
            >
              <Ionicons name='close' size={24} color='#666' />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.filterRow}>
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    modalState.category === '' && styles.selectedFilterChip,
                  ]}
                  onPress={() => updateModalFilter('category', '')}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      modalState.category === '' &&
                        styles.selectedFilterChipText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {categories?.map((category) => (
                  <TouchableOpacity
                    key={category.slug}
                    style={[
                      styles.filterChip,
                      modalState.category === category.slug &&
                        styles.selectedFilterChip,
                    ]}
                    onPress={() => updateModalFilter('category', category.slug)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        modalState.category === category.slug &&
                          styles.selectedFilterChipText,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    modalState.sortBy === 'price' && styles.selectedSortButton,
                  ]}
                  onPress={() => updateModalFilter('sortBy', 'price')}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      modalState.sortBy === 'price' &&
                        styles.selectedSortButtonText,
                    ]}
                  >
                    Price
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    modalState.sortBy === 'rating' && styles.selectedSortButton,
                  ]}
                  onPress={() => updateModalFilter('sortBy', 'rating')}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      modalState.sortBy === 'rating' &&
                        styles.selectedSortButtonText,
                    ]}
                  >
                    Rating
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Order</Text>
              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    modalState.sortOrder === 'asc' && styles.selectedSortButton,
                  ]}
                  onPress={() => updateModalFilter('sortOrder', 'asc')}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      modalState.sortOrder === 'asc' &&
                        styles.selectedSortButtonText,
                    ]}
                  >
                    Ascending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    modalState.sortOrder === 'desc' &&
                      styles.selectedSortButton,
                  ]}
                  onPress={() => updateModalFilter('sortOrder', 'desc')}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      modalState.sortOrder === 'desc' &&
                        styles.selectedSortButtonText,
                    ]}
                  >
                    Descending
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
