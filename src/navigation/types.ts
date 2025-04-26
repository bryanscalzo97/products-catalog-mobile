import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: number };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
