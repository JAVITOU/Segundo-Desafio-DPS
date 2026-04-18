import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ item, onPress }) => {
  // Validación de seguridad para el precio
  const displayPrice = (item && item.price) ? item.price.toFixed(2) : '0.00';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name || 'Unknown'}</Text>
        <Text style={styles.price}>${displayPrice}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 15, color: '#D52B1E', fontWeight: 'bold', marginVertical: 4 },
  description: { fontSize: 12, color: '#777' },
});

export default ProductCard;