import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './ProductDetailScreenStyles';
import { useReminder } from './hooks/useReminder';
import * as Notifications from 'expo-notifications';
import { ProductHeader } from './components/ProductHeader';
import { ProductPrice } from './components/ProductPrice';
import { ProductDescription } from './components/ProductDescription';
import { ReminderButton } from './components/ReminderButton';

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Product Details ScrollView */}
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProductHeader product={product} />

        <View style={styles.contentContainer}>
          <ProductPrice product={product} />
          <ProductDescription product={product} />
        </View>
      </ScrollView>

      {/* Purchase Reminder Button */}
      <ReminderButton onPress={handleReminderPress} />
      <DateTimePickerModal
        isVisible={datePickerOpen}
        mode='datetime'
        onConfirm={(date) => {
          handleAddReminder(date);
          setDatePickerOpen(false);
        }}
        onCancel={() => setDatePickerOpen(false)}
      />
    </SafeAreaView>
  );
};
