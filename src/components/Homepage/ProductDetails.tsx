import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/products";
import { Link, useParams } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { handleAddToCart, getSingleProduct } = useCart();
  const [product, setProduct] = useState<Product>();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      const res = await getSingleProduct(params.id);
      setProduct(res);
    };
    fetchProduct();
  }, [getSingleProduct, params.id]);

  if (product === undefined) {
    return;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="object-cover w-full h-full"
            />
            <Badge variant="secondary" className="absolute top-4 left-4">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>
            <p className="text-4xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleAddToCart(product._id as string)}
              size="lg"
              className="w-full flex items-center space-x-2 hover:cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Warranty</p>
                <p className="text-xs text-muted-foreground">1 year coverage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
