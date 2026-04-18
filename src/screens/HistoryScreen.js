import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused(); // Detecta cuando el usuario entra a esta pestaña

  // Función para cargar los datos
  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('orderHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Error loading history", error);
    }
  };

  // Recargar cada vez que el usuario toca la pestaña de Historial
  useEffect(() => {
    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
      </View>
      <Text style={styles.itemsSummary}>
        {item.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aún no tienes órdenes registradas.</Text>
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  list: { padding: 20 },
  historyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dateText: { fontWeight: 'bold', color: '#555' },
  totalText: { fontWeight: 'bold', color: '#D52B1E', fontSize: 16 },
  itemsSummary: { color: '#777', fontSize: 13, lineHeight: 18 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});