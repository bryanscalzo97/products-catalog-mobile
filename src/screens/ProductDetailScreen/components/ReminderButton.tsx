import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../ProductDetailScreenStyles';

type ReminderButtonProps = {
  onPress: () => void;
};

export const ReminderButton: React.FC<ReminderButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.reminderContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.reminderButton,
          pressed && { opacity: 0.8 },
        ]}
        onPress={onPress}
      >
        <Ionicons name='notifications-outline' size={22} color='#fff' />
        <Text style={styles.reminderButtonText}>Set Purchase Reminder</Text>
      </Pressable>
    </View>
  );
};
