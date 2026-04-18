import { useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { PRODUCTOS } from '../data/productos';

export default function MenuScreen({ onAddToCart }) {
  // Estado para la categoría seleccionada (all, food, drink, dessert)
  const [category, setCategory] = useState('all');
  const [quantities, setQuantities] = useState({});

  const updateLocalQty = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  const handleAddToCart = (item, quantity) => {
    onAddToCart(item, quantity);
    Alert.alert("¡Agregado!", `${quantity}x ${item.name} se añadió al carrito.`);

    setQuantities(prev => ({
      ...prev,
      [item.id]: 1 
    }));

    Alert.alert(
      "¡Agregado!", 
      `${quantity}x ${item.name} se añadió al carrito.`,
      [{ text: "Continuar" }]
    );
  };

  // Filtrado lógico de los productos
  const filteredData = category === 'all' 
    ? PRODUCTOS 
    : PRODUCTOS.filter(item => item.type === category);

  // Componente para los botones de categoría
  const FilterButton = ({ title, type }) => (
    <TouchableOpacity 
      style={[styles.filterBtn, category === type && styles.filterBtnActive]} 
      onPress={() => setCategory(type)}
    >
      <Text style={[styles.filterText, category === type && styles.filterTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Categorías */}
      <View style={styles.filterContainer}>
        <FilterButton title="Todos" type="all" />
        <FilterButton title="Comida" type="food" />
        <FilterButton title="Bebida" type="drink" />
        <FilterButton title="Postre" type="dessert" />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
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
                  onPress={() => handleAddToCart(item, currentQty)}
                >
                  <Text style={styles.addBtnText}>Agregar {currentQty}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  filterContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 15, 
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  filterBtn: { 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#D52B1E' 
  },
  filterBtnActive: { backgroundColor: '#D52B1E' },
  filterText: { color: '#D52B1E', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: '#fff' },
  cardContainer: { backgroundColor: '#fff', marginBottom: 12, paddingBottom: 15 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 8 },
  stepBtn: { padding: 10, width: 40, alignItems: 'center' },
  btnText: { fontSize: 20, fontWeight: 'bold' },
  qtyText: { fontSize: 16, fontWeight: 'bold', minWidth: 25, textAlign: 'center' },
  addBtn: { backgroundColor: '#D52B1E', paddingVertical: 12, borderRadius: 8, flex: 1, marginLeft: 15, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold' }
});