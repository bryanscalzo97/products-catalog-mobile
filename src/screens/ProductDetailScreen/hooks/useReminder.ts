import { useState, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import PurchaseReminderModule from '../../../../modules/purchase-reminder';
import * as Notifications from 'expo-notifications';
import { Product } from '../../../models/Product';
import { useNavigation } from '@react-navigation/native';

export const useReminder = () => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

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

  const scheduleSimpleNotification = async (product: Product) => {
    const { status } = await Notifications.requestPermissionsAsync();
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
        seconds: 5,
      },
    });
  };

  return {
    datePickerOpen,
    setDatePickerOpen,
    handleAddReminder,
    scheduleSimpleNotification,
  };
};
