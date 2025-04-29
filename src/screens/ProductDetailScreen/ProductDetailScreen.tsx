import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Pressable,
  Platform,
  Alert,
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

  // Product detail data
  const {
    data: product,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetProductById(productId);

  // Purchase reminder state and functions
  const {
    datePickerOpen,
    setDatePickerOpen,
    handleAddReminder,
    scheduleSimpleNotification,
  } = useReminder();

  // Effect to schedule notification a minutes after the user opens the product detail screen for engagement purposes.
  useEffect(() => {
    if (product) {
      scheduleSimpleNotification(product);
    }
    Notifications.addNotificationResponseReceivedListener((response) => {
      const productId = response.notification.request.content.data.productId;
      navigation.navigate('ProductDetail', { productId });
    });
  }, [product]);

  const handleReminderPress = () => {
    if (Platform.OS === 'ios') {
      setDatePickerOpen(true);
    } else {
      Alert.alert(
        'iOS Only Feature',
        'The purchase reminder feature is currently only available on iOS. We are working on bringing this feature to Android soon!',
        [{ text: 'OK' }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size='large' color='#222' />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name='alert-circle-outline' size={48} color='#FF3B30' />
        <Text style={styles.errorText}>
          Unable to load product details. Please try again later.
        </Text>
      </View>
    );
  }

  const formatPrice = (price: number) => {
    const [dollars, cents] = price.toFixed(2).split('.');
    return { dollars, cents };
  };

  const { dollars, cents } = formatPrice(product.price);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.categoryLabel}>{product.category}</Text>
            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.ratingContainer}>
              <Ionicons name='star' size={18} color='#FFD700' />
              <Text style={styles.rating}>{product.rating.rate}</Text>
              <Text style={styles.ratingCount}>
                ({product.rating.count} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${dollars}</Text>
              <Text style={styles.priceDecimals}>{cents}</Text>
            </View>
            <Text style={styles.stockLabel}>
              {product.rating.count > 0
                ? `Stock available (${product.rating.count} units)`
                : 'Out of stock'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this product</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Reminder Button */}
      <View style={styles.reminderContainer}>
        <DateTimePickerModal
          isVisible={datePickerOpen}
          mode='datetime'
          onConfirm={(date) => {
            handleAddReminder(date);
            setDatePickerOpen(false);
          }}
          onCancel={() => setDatePickerOpen(false)}
        />
        <Pressable
          style={({ pressed }) => [
            styles.reminderButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleReminderPress}
        >
          <Ionicons name='notifications-outline' size={22} color='#fff' />
          <Text style={styles.reminderButtonText}>Set Purchase Reminder</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
