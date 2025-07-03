import Navbar from "@/components/Homepage/Navbar";
import { CartProvider } from "@/context/cartContext";
import type { FC } from "react";
import "../App.css";
const Homepage: FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
      </div>
    </CartProvider>
  );
};

export default Homepage;
