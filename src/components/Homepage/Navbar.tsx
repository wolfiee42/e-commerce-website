import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart, Home } from "lucide-react";
import { useCart } from "@/context/cartContext";

const Navbar: FC = () => {
  const { openCart } = useCart();

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between w-full mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl">EcoShop</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 relative hover:cursor-pointer"
            onClick={openCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
