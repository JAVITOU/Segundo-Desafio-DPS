import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../src/components/ProductCard';
import { PRODUCTOS } from '../src/data/productos';
import LoginScreen from '../src/screens/LoginScreen';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Si no ha iniciado sesión, mostramos el Login
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Si ya inició sesión, mostramos el Menú
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mexican Menu</Text>
        </View>
        
        <FlatList
          data={PRODUCTOS}
          renderItem={({ item }) => (
            <ProductCard 
              item={item} 
              onPress={() => alert(`Order: ${item.name}`)} 
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { backgroundColor: '#D52B1E', padding: 20, alignItems: 'center' },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});