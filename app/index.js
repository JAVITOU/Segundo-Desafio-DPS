import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

import CartScreen from '../src/screens/CartScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import LoginScreen from '../src/screens/LoginScreen';
import MenuScreen from '../src/screens/MenuScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  // Añadir con cantidad específica
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Función para actualizar cantidades o borrar desde el carrito
  const updateCartQuantity = (id, change) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const saveOrderToHistory = async (newOrder) => {
    try {
      const existingHistory = await AsyncStorage.getItem('orderHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newOrder, ...history];
      await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
      setCart([]); 
      alert("¡Orden procesada con éxito!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

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
      <Tab.Screen name="Menu">
        {(props) => <MenuScreen {...props} onAddToCart={addToCart} />}
      </Tab.Screen>
      <Tab.Screen name="Cart">
        {(props) => (
          <CartScreen 
            {...props} 
            cartItems={cart} 
            onUpdateQuantity={updateCartQuantity}
            onConfirm={saveOrderToHistory} 
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}