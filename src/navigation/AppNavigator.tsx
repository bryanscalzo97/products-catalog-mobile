import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { Product } from '../models/Product';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/RQClientConfig';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    // Wrap the app with QueryClientProvider to enable React Query functionality
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: 'Products' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};
