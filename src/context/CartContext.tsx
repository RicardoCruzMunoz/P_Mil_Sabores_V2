import { createContext, useContext, useState, type ReactNode } from "react";
import type { Producto } from "../interfaces/Producto";

export type CartItem = Producto & {
  cantidad: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (upc: string) => void;
  updateQuantity: (upc: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Agregar producto al carrito usando UPC
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existe = prev.find(p => p.upc === item.upc);
      if (existe) {
        return prev.map(p =>
          p.upc === item.upc ? { ...p, cantidad: p.cantidad + item.cantidad } : p
        );
      }
      return [...prev, item];
    });
  };

  // Remover usando UPC
  const removeFromCart = (upc: string) => {
    setCart(prev => prev.filter(item => item.upc !== upc));
  };

  // Actualizar cantidad usando UPC
  const updateQuantity = (upc: string, qty: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.upc === upc
            ? { ...item, cantidad: Math.max(1, qty) }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
