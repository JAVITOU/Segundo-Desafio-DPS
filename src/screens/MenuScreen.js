import { useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { PRODUCTOS } from '../data/productos';

export default function MenuScreen({ onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const updateLocalQty = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  // Nueva función para manejar el clic y mostrar el mensaje
  const handleAddToCart = (item, quantity) => {
    onAddToCart(item, quantity); // Llama a la lógica global en index.js
    
    // Muestra el mensaje de confirmación en pantalla
    Alert.alert(
      "¡Agregado!", 
      `${quantity}x ${item.name} se añadió a tu carrito correctamente.`,
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTOS}
        renderItem={({ item }) => {
          const currentQty = quantities[item.id] || 1;
          return (
            <View style={styles.cardContainer}>
              <ProductCard item={item} onPress={() => {}} />
              <View style={styles.controls}>
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => updateLocalQty(item.id, -1)} style={styles.stepBtn}>
                    <Text style={styles.btnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{currentQty}</Text>
                  <TouchableOpacity onPress={() => updateLocalQty(item.id, 1)} style={styles.stepBtn}>
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.addBtn} 
                  onPress={() => handleAddToCart(item, currentQty)} // Usamos la nueva función
                >
                  <Text style={styles.addBtnText}>Agregar {currentQty}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  cardContainer: { backgroundColor: '#fff', marginBottom: 10, paddingBottom: 15, elevation: 2 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  stepBtn: { padding: 10, width: 45, alignItems: 'center' },
  btnText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  qtyText: { fontSize: 18, fontWeight: 'bold', minWidth: 30, textAlign: 'center' },
  addBtn: { backgroundColor: '#D52B1E', paddingVertical: 12, borderRadius: 8, flex: 1, marginLeft: 15, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});