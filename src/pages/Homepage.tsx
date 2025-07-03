import Navbar from "@/components/Homepage/Navbar";
import { CartProvider } from "@/context/cartContext";
import type { FC } from "react";
import "../App.css";
import ProductGrid from "@/components/Homepage/ProductGrid";
const Homepage: FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background ">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full ">
          <ProductGrid />
        </div>
      </div>
    </CartProvider>
  );
};

export default Homepage;
