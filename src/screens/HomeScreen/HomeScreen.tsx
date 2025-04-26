import React, { useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../models/Product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useGetProducts, useGetCategories } from '../../api/productsApi';
import { Ionicons } from '@expo/vector-icons';
import { useFilters } from './useFilters';

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
    navigation.navigate('ProductDetail', { product });
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Ionicons name='options-outline' size={24} color='#666' />
        </TouchableOpacity>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  filterSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#222',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  filterChipText: {
    fontSize: 14,
    color: '#222',
  },
  selectedFilterChip: {
    backgroundColor: '#0060b3',
    borderColor: '#0060b3',
  },
  selectedFilterChipText: {
    color: '#fff',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#222',
  },
  selectedSortButton: {
    backgroundColor: '#0060b3',
  },
  selectedSortButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#0060b3',
    padding: 20,
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
});
