import type { Product } from "@/lib/products";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

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
  getProducts: () => Promise<Product[]>;
  getSingleProduct: (id: string) => Promise<Product | undefined>;
  handleAddToCart: (productId: string) => Promise<void>;
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

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<CartState>({
    items: [],
    isOpen: false,
  });

  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setState((prev) => ({
          ...prev,
          items: JSON.parse(storedCart),
        }));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get(
        "https://e-commerce-website-backend-gules-nu.vercel.app/products"
      );
      return response?.data?.products || [];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const getSingleProduct = async (
    productID: string
  ): Promise<Product | undefined> => {
    if (!productID) {
      console.error("No product ID provided to getSingleProduct");
      return undefined;
    }
    try {
      const response = await axios.get(
        `https://e-commerce-website-backend-gules-nu.vercel.app/product/${productID}`
      );
      return response?.data?.product;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return undefined;
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!productId) {
      console.error("No product ID provided to handleAddToCart");
      return;
    }
    try {
      const response = await axios.get(
        `https://e-commerce-website-backend-gules-nu.vercel.app/product/${productId}`
      );
      const product = response.data.product;

      if (!product) {
        throw Error("No Product Available.");
      }
      setState((prev) => {
        const existingItem = prev.items.find(
          (item) => item.product._id === productId
        );
        let newItems;
        if (existingItem) {
          newItems = prev.items.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...prev.items, { product, quantity: 1 }];
        }
        try {
          localStorage.setItem("cart", JSON.stringify(newItems));
        } catch (error) {
          console.error("Failed to save cart to localStorage:", error);
        }
        return { ...prev, items: newItems };
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
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
    if (!productID) {
      console.error("No product ID provided to updateQuantity");
      return;
    }
    if (quantity === 0) return; // No change
    setState((prev) => {
      const existingItem = prev.items.find(
        (item) => item.product._id === productID
      );
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prev.items
          .map((item) =>
            item.product._id === productID
              ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
              : item
          )
          .filter((item) => item.quantity > 0);
      } else {
        newItems = prev.items;
      }
      try {
        localStorage.setItem("cart", JSON.stringify(newItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
      return { ...prev, items: newItems };
    });
  };

  const removeItem = (productID: string) => {
    if (!productID) {
      console.error("No product ID provided to removeItem");
      return;
    }
    setState((prev) => {
      const removeableItem = prev.items.filter(
        (items) => items.product._id !== productID
      );
      try {
        localStorage.setItem("cart", JSON.stringify(removeableItem));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
      return { ...prev, items: removeableItem };
    });
  };

  const removeAll = () => {
    setState((prev) => {
      const newItems: CartItem[] = [];
      try {
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Failed to clear cart from localStorage:", error);
      }
      return { ...prev, items: newItems };
    });
  };

  const getTotalPrice = () => {
    try {
      return state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    } catch (error) {
      console.error("Failed to calculate total price:", error);
      return 0;
    }
  };

  const contextValue = {
    state,
    getProducts,
    getSingleProduct,
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
