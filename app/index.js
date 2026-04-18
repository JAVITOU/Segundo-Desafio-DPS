import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Restaurante Mexicano</Text>
        <Text style={styles.subtitulo}>Desafío Práctico 2 - UDB</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.texto}>¡Hola Francisco!</Text>
        <Text>El entorno está listo para crear componentes.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#D52B1E', // Rojo
    padding: 40,
    alignItems: 'center',
  },
  titulo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: 'white',
    fontSize: 14,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});