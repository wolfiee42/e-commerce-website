import Navbar from "@/components/Homepage/Navbar";
import { CartProvider } from "@/context/cartContext";
import type { FC } from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import CartSidebar from "@/components/Homepage/CartSidebar";
const Homepage: FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background ">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full ">
          <Outlet />
        </div>
        <CartSidebar />
      </div>
    </CartProvider>
  );
};

export default Homepage;
