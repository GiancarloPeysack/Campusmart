import React, { createContext, useContext, useState, useMemo } from "react";
import { Alert } from "react-native";

interface CartItem {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  total: number;
  deliveryFee: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const deliveryFee = 5.0; // Set a default delivery fee

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      if (prevCart.length === 0) {
        return [...prevCart, { ...item }];
      } else {
        const firstItem = prevCart[0];
        if (firstItem.restaurantId === item.restaurantId) {
          const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

          if (existingItem) {
            return prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            return [...prevCart, { ...item }];
          }
        } else {
          Alert.alert(
            "Different Restaurant",
            "Adding this item will remove the current cart. Continue?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  setCart([{ ...item, quantity: 1 }]);
                },
              },
            ]
          );
          return prevCart;
        }
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate subtotal (sum of item prices * quantity)
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  // Calculate total (subtotal + delivery fee)
  const total = useMemo(() => (cart.length > 0 ? subtotal + deliveryFee : 0), [subtotal, cart]);


  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, subtotal, total, deliveryFee, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
