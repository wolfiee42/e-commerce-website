import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useCart } from "@/context/cartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { handleAddToCart } = useCart();

  console.log(handleAddToCart);

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="w-full max-w-[200px] mx-auto hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
        <CardContent>
          <div className="aspect-square relative mb-3 overflow-hidden rounded-[4px]">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <Badge variant="secondary" className="absolute top-2 right-2">
              {product.category}
            </Badge>
          </div>

          <div className="space-y-2 flex flex-col">
            <h3
              className="font-semibold text-sm line-clamp-2 leading-tight"
              style={{ minHeight: "2.5em" }}
            >
              {product.title}
            </h3>

            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.stock} in stock)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex flex-col items-center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAddToCart(product.id);
            }}
            size="sm"
            className="w-full min-w-[160px] flex items-center rounded-[6px] hover:cursor-pointer"
          >
            <ShoppingCart className="h-3 w-3" />
            <span className="text-xs">Add to Cart</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
