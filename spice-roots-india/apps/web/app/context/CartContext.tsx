'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  weight: string;
  qty: number;
  img: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number, weight: string) => void;
  updateQty: (id: number, weight: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sri_cart');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('sri_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id && i.weight === newItem.weight);
      if (existing) {
        return prev.map(i =>
          i.id === newItem.id && i.weight === newItem.weight
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number, weight: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.weight === weight)));
  }, []);

  const updateQty = useCallback((id: number, weight: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev =>
      prev.map(i => i.id === id && i.weight === weight ? { ...i, qty } : i)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((a, b) => a + b.qty, 0);
  const totalPrice = items.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
