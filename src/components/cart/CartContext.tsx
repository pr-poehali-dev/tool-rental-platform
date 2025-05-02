
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
  days: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, days?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateDays: (productId: number, days: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  deliveryFee: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(300);
  const { toast } = useToast();

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, days = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Если товар уже в корзине, увеличиваем количество
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        
        toast({
          title: "Товар добавлен",
          description: `Количество ${product.name} увеличено`,
          variant: "default",
        });
        
        return updatedItems;
      } else {
        // Если товара нет в корзине, добавляем его
        toast({
          title: "Товар добавлен",
          description: `${product.name} добавлен в корзину`,
          variant: "default",
        });
        
        return [...prevItems, { product, quantity, days }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      const productToRemove = prevItems.find(item => item.product.id === productId);
      if (productToRemove) {
        toast({
          title: "Товар удален",
          description: `${productToRemove.product.name} удален из корзины`,
          variant: "default",
        });
      }
      
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateDays = (productId: number, days: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, days } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Корзина очищена",
      description: "Все товары удалены из корзины",
      variant: "default",
    });
  };

  // Расчет общей стоимости
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity * item.days,
    0
  );
  
  const total = subtotal + (items.length > 0 ? deliveryFee : 0);
  
  // Общее количество товаров в корзине
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDays,
    clearCart,
    subtotal,
    total,
    deliveryFee,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
