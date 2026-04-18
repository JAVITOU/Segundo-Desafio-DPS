import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuantitySelector({ quantity, onAdd, onRemove }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  button: { backgroundColor: '#D52B1E', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  quantity: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' }
});