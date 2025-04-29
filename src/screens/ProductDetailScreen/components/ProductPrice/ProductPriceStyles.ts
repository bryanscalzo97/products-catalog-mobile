import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  priceSection: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: '600',
    color: '#222',
  },
  priceDecimals: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginLeft: 2,
  },
  stockLabel: {
    fontSize: 14,
    color: '#00A650',
    marginTop: 8,
  },
});
