import { Alert, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { PRODUCTOS } from '../data/productos';

export default function MenuScreen({ onAddToCart }) {
  const handlePress = (item) => {
    onAddToCart(item);
    Alert.alert("Añadido", `${item.name} se agregó al carrito.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTOS}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
});