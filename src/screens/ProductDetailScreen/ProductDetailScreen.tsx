import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Button,
  Alert,
  Linking,
} from 'react-native';
import { useGetProductById } from '../../api/productsApi';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import PurchaseReminderModule from '../../../modules/purchase-reminder';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;

  const {
    data: product,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetProductById(productId);

  const handleCreateReminder = async () => {
    try {
      const eventId = await PurchaseReminderModule.createReminder();
      console.log('✅ Event created with ID:', eventId);

      Alert.alert(
        '✅ Recordatorio creado',
        '¿Quieres ver el evento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Ver Evento',
            onPress: () => openEventInCalendar(eventId),
          },
        ],
        { cancelable: true }
      );
    } catch (error: any) {
      Alert.alert('❌ Error', error?.message || 'Algo salió mal');
    }
  };

  const openEventInCalendar = (eventId: string) => {
    // 👇 Aquí hay un pequeño truco: no existe una URL pública estándar para un eventIdentifier
    // Así que simplemente abrimos la app Calendario
    Linking.openURL('calshow://');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.errorContainer}>
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
              <Button title='Add to calendar' onPress={handleCreateReminder} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    padding: 20,
  },
  errorText: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
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
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
});
