import React, { createContext, useState, useContext, useEffect } from 'react';

export interface CartItem {
  id: string;
  originalId: number;
  category: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  seller: string;
  stock: number;
  selected: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, category?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  toggleSelectItem: (id: string) => void;
  toggleSelectAll: () => void;
  clearCart: () => void;
  cartCount: number;
  selectedItems: CartItem[];
  subtotal: number;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any, category: string = 'general') => {
    setCartItems(prevItems => {
      const uniqueId = `${category}-${product.id}`;
      const existingItem = prevItems.find(item => item.id === uniqueId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const productName = product.nombre || product.name || 'Producto';
        
        let originalPrice = product.precioOriginal || product.originalPrice || 0;
        if (typeof originalPrice === 'string') {
          originalPrice = parseFloat(originalPrice.replace(/[^0-9.-]+/g, ''));
        }
        
        let currentPrice = product.precio || product.price || 0;
        if (typeof currentPrice === 'string') {
          currentPrice = parseFloat(currentPrice.replace(/[^0-9.-]+/g, ''));
        }
        
        if (!originalPrice && currentPrice) {
          originalPrice = currentPrice * 1.2;
        }
        
        const newItem: CartItem = {
          id: uniqueId,
          originalId: product.id,
          category: category,
          name: productName,
          price: currentPrice,
          originalPrice: originalPrice,
          quantity: 1,
          image: product.imagen || product.image || '',
          seller: product.marca || product.seller || 'Vendedor',
          stock: product.stock || 10,
          selected: true
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleSelectItem = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(prev =>
      prev.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = selectedItems.reduce((sum, item) => 
    sum + ((item.originalPrice - item.price) * item.quantity), 0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelectItem,
      toggleSelectAll,
      clearCart,
      cartCount: cartItems.length,
      selectedItems,
      subtotal,
      discount
    }}>
      {children}
    </CartContext.Provider>
  );
};