import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['productscatalog://', 'exp+products-catalog://'],
  config: {
    screens: {
      Home: {
        path: 'category/:category?',
        parse: {
          category: (category: string) => decodeURIComponent(category),
        },
      },
      ProductDetail: {
        path: 'product/:productId',
        parse: {
          productId: (productId: string) => parseInt(productId),
        },
      },
    },
  },
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Products',
          }}
        />
        <Stack.Screen
          name='ProductDetail'
          component={ProductDetailScreen}
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
