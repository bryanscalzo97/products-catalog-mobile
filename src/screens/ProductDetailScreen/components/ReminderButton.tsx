import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../ProductDetailScreenStyles';

type ReminderButtonProps = {
  onPress: () => void;
};

export const ReminderButton: React.FC<ReminderButtonProps> = ({ onPress }) => {
  if (Platform.OS !== 'ios') return null;

  return (
    <TouchableOpacity style={styles.reminderButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name='calendar' size={18} color='#333' />
      </View>
      <Text style={styles.reminderButtonText}>Add Purchase Reminder</Text>
    </TouchableOpacity>
  );
};
