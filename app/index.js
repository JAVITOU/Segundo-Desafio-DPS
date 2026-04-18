import { Ionicons } from '@expo/vector-icons'; // Iconos para las pestañas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

// Pantallas y Componentes
import CartScreen from '../src/screens/CartScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import LoginScreen from '../src/screens/LoginScreen';
import MenuScreen from '../src/screens/MenuScreen'; // Moveremos la lista aquí

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Menu') iconName = 'restaurant';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'History') iconName = 'time';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D52B1E', // Rojo Mexicano
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#D52B1E' },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}