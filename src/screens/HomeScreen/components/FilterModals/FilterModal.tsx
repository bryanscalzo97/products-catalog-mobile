import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../HomeScreenStyles';
import { Category } from '../../../../repositories/productRepository';

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApply: () => void;
  categories: Category[];
  modalState: {
    category: string;
    sortBy: string;
    sortOrder: string;
  };
  onUpdateFilter: (
    key: 'category' | 'sortBy' | 'sortOrder',
    value: string
  ) => void;
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
  categories,
  modalState,
  onUpdateFilter,
}) => {
  const handleReset = () => {
    onUpdateFilter('category', '');
    onUpdateFilter('sortBy', 'price');
    onUpdateFilter('sortOrder', 'asc');
  };

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      <View style={styles.modalContainer}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name='close' size={24} color='#666' />
          </TouchableOpacity>
        </View>

        {/* Modal Content */}
        <ScrollView style={styles.modalContent}>
          {/* Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.filterRow}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  modalState.category === '' && styles.selectedFilterChip,
                ]}
                onPress={() => onUpdateFilter('category', '')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    modalState.category === '' && styles.selectedFilterChipText,
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
                  onPress={() => onUpdateFilter('category', category.slug)}
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

          {/* Sort Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  modalState.sortBy === 'price' && styles.selectedSortButton,
                ]}
                onPress={() => onUpdateFilter('sortBy', 'price')}
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
                onPress={() => onUpdateFilter('sortBy', 'rating')}
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

          {/* Order Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Order</Text>
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  modalState.sortOrder === 'asc' && styles.selectedSortButton,
                ]}
                onPress={() => onUpdateFilter('sortOrder', 'asc')}
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
                  modalState.sortOrder === 'desc' && styles.selectedSortButton,
                ]}
                onPress={() => onUpdateFilter('sortOrder', 'desc')}
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
        </ScrollView>

        {/* Footer with Reset and Apply buttons */}
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
