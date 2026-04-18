import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

import CartScreen from '../src/screens/CartScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import LoginScreen from '../src/screens/LoginScreen';
import MenuScreen from '../src/screens/MenuScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // ESTADO GLOBAL DEL CARRITO
  const [cart, setCart] = useState([]);

  // FUNCIÓN PARA AGREGAR AL CARRITO
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Menu' ? 'restaurant' : route.name === 'Cart' ? 'cart' : 'time';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D52B1E',
        headerStyle: { backgroundColor: '#D52B1E' },
        headerTintColor: '#fff',
      })}
    >
      {/* Pasamos las funciones y el estado como "children" o props */}
      <Tab.Screen name="Menu">
        {(props) => <MenuScreen {...props} onAddToCart={addToCart} />}
      </Tab.Screen>
      <Tab.Screen name="Cart">
        {(props) => <CartScreen {...props} cartItems={cart} setCart={setCart} />}
      </Tab.Screen>
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
  