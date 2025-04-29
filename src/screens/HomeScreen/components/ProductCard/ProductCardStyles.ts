import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardPressed: {
    backgroundColor: '#FAFAFA',
    transform: [{ scale: 0.985 }],
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  info: {
    padding: 16,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 15,
    color: '#484848',
    marginBottom: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#484848',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#767676',
  },
  categoryContainer: {
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    color: '#179185',
    textTransform: 'capitalize',
    backgroundColor: '#F4FAFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
