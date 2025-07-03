import { products, type Product } from "@/lib/products";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType {
  state: CartState;
  handleAddToCart: (productId: string) => void;
  closeCart: () => void;
  openCart: () => void;
  updateQuantity: (productID: string, quantity: number) => void;
  removeItem: (productID: string) => void;
  removeAll: () => void;
  getTotalPrice: () => number;
  showCheckout: boolean;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({
    items: [],
    isOpen: false,
  });

  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setState((prev) => ({
        ...prev,
        items: JSON.parse(storedCart),
      }));
    }
  }, []);

  const handleAddToCart = (productId: string) => {
    // logic will change after integrating backend.
    const product = products.find((product) => product.id === productId);
    if (!product) {
      throw Error("No Product Available.");
    }
    setState((prev) => {
      const existingItem = prev.items.find(
        (item) => item.product.id === productId
      );
      let newItems;
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { ...prev, items: newItems };
    });
  };

  const closeCart = () => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const openCart = () => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  };

  const updateQuantity = (productID: string, quantity: number) => {
    setState((prev) => {
      const existingItem = prev.items.find(
        (item) => item.product.id === productID
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.product.id === productID
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If the item does not exist, just return the previous items unchanged
        newItems = prev.items;
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { ...prev, items: newItems };
    });
  };

  const removeItem = (productID: string) => {
    setState((prev) => {
      const removeableItem = prev.items.filter(
        (items) => items.product.id !== productID
      );
      localStorage.setItem("cart", JSON.stringify(removeableItem));
      return { ...prev, items: removeableItem };
    });
  };

  const removeAll = () => {
    setState((prev) => {
      const newItems: CartItem[] = [];
      localStorage.removeItem("cart");
      return { ...prev, items: newItems };
    });
  };

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const contextValue = {
    state,
    handleAddToCart,
    closeCart,
    openCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    showCheckout,
    setShowCheckout,
    removeAll,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
