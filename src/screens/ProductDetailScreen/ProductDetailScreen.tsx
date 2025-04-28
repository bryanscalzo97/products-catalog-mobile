import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useGetProductById } from '../../api/productsApi';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {
  ProductDetailScreenNavigationProp,
  RootStackParamList,
} from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './ProductDetailScreenStyles';
import { useReminder } from './hooks/useReminder';
import { ReminderButton } from './components/ReminderButton';
import * as Notifications from 'expo-notifications';

// Define the type for route parameters specific to this screen
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

// Configure how notifications are handled when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const { productId } = route.params;

  const {
    data: product,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetProductById(productId);

  const {
    datePickerOpen,
    setDatePickerOpen,
    handleAddReminder,
    scheduleSimpleNotification,
  } = useReminder();

  // Effect to schedule notification a minutes after the user opens the product detail screen for engagement purposes
  useEffect(() => {
    if (product) {
      scheduleSimpleNotification(product);
    }
    // Add listener for notification onPress event
    Notifications.addNotificationResponseReceivedListener((response) => {
      const productId = response.notification.request.content.data.productId;
      // TODO: fix type error
      // @ts-ignore
      navigation.navigate('ProductDetail', { productId });
    });
  }, [product]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error loading product details</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {product.title} {productId}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name='star' size={16} color='#FFD700' />
              <Text style={styles.rating}>{product.rating.rate}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name='pricetag-outline' size={20} color='#666' />
              <Text style={styles.detailText}>
                Category: {product.category}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name='layers-outline' size={20} color='#666' />
              <Text style={styles.detailText}>
                Available: {product.rating.count} units
              </Text>
            </View>
          </View>

          {/* Purchase Reminder Button */}
          <ReminderButton onPress={() => setDatePickerOpen(true)} />

          {/* Purchase Reminder Date Picker Modal */}
          <DateTimePickerModal
            isVisible={datePickerOpen}
            mode='datetime'
            onConfirm={(date) => {
              handleAddReminder(date);
              setDatePickerOpen(false);
            }}
            onCancel={() => setDatePickerOpen(false)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
