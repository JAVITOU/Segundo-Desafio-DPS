import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen({ cartItems, onUpdateQuantity, onConfirm }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>${item.price.toFixed(2)} c/u</Text>
      </View>
      
      <View style={styles.qtyActions}>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, -1)}>
          <Ionicons name="remove-circle-outline" size={28} color="#D52B1E" />
        </TouchableOpacity>
        <Text style={styles.qtyNum}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, 1)}>
          <Ionicons name="add-circle-outline" size={28} color="#D52B1E" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Carrito vacío</Text>}
      />
      
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.mainBtn} 
            onPress={() => onConfirm({ id: Date.now().toString(), date: new Date().toLocaleString(), items: cartItems, total })}
          >
            <Text style={styles.mainBtnText}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#666' },
  qtyActions: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 },
  qtyNum: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#D52B1E', width: 70, textAlign: 'right' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  totalText: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
  mainBtn: { backgroundColor: '#000', padding: 18, borderRadius: 12, alignItems: 'center' },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});