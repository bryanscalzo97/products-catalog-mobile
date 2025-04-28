import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useGetProductById } from '../../api/productsApi'; // Custom hook to fetch product details by ID
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'; // Hooks for navigation and route management
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import PurchaseReminderModule from '../../../modules/purchase-reminder'; // Custom module for creating purchase reminders
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Library for date-time picker modal
import * as Notifications from 'expo-notifications';
import { Product } from '../../models/Product'; // Type definition for Product

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

// Function to schedule a simple push notification for a product
async function scheduleSimpleNotification(product: Product) {
  const { status } = await Notifications.requestPermissionsAsync(); // Request notification permissions
  if (status !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Still thinking about ${product.title}?`,
      body: `Don't wait too long. ${product.title} could be yours!`,
      data: {
        productId: product.id ?? 26,
        title: product.title ?? 'test',
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5, // Set notification to trigger after 5 seconds for testing purposes
    },
  });
}

export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const navigation = useNavigation();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Fetch product details using custom hook
  const {
    data: product,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetProductById(productId);

  // Effect to schedule notification when product is available
  useEffect(() => {
    if (product) {
      scheduleSimpleNotification(product);
    }
    // Add listener for notification response
    Notifications.addNotificationResponseReceivedListener((response) => {
      const productId = response.notification.request.content.data.productId;
      // @ts-ignore
      navigation.navigate('ProductDetail', { productId });
    });
  }, [product]);

  const handleAddReminder = async (selectedDate: Date) => {
    try {
      const eventId = await PurchaseReminderModule.createReminder(
        selectedDate.getTime()
      );
      Alert.alert('✅ Reminder Created', 'Would you like to view the event?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'View Event',
          onPress: () => openEventInCalendar(eventId, selectedDate),
        },
      ]);
    } catch (error: any) {
      Alert.alert('❌ Error', error?.message || 'Something went wrong');
    }
  };

  const openEventInCalendar = (eventId: string, date: Date) => {
    const secondsSince2001 =
      (date.getTime() - new Date('2001-01-01T00:00:00Z').getTime()) / 1000;
    const url = `calshow:${secondsSince2001}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('❌ Error', 'Could not open calendar');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => Alert.alert('❌ Error', 'Could not open calendar'));
  };

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
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.contentContainer}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

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
              <Ionicons
                name='battery-charging-outline'
                size={20}
                color='#666'
              />
              <Text style={styles.detailText}>
                Available: {product.rating.count} units
              </Text>
            </View>
          </View>

          {/* Reminder Button - just available for iOS */}
          {Platform.OS === 'ios' && (
            <>
              <TouchableOpacity
                style={styles.reminderButton}
                onPress={() => setDatePickerOpen(true)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name='calendar' size={18} color='#333' />
                </View>
                <Text style={styles.reminderButtonText}>
                  Add Purchase Reminder
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={datePickerOpen}
                mode='datetime'
                onConfirm={(date) => {
                  handleAddReminder(date);
                  setDatePickerOpen(false);
                }}
                onCancel={() => setDatePickerOpen(false)}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { fontSize: 16 },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  contentContainer: { padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  rating: { marginLeft: 5, fontSize: 14, color: '#666' },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  description: { fontSize: 16, lineHeight: 24, color: '#666' },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: { marginLeft: 10, fontSize: 16, color: '#666' },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginTop: 12,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reminderButtonText: { fontSize: 16, fontWeight: '600', color: '#333' },
});
