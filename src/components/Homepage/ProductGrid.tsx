import { useEffect, useState, type FC } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/cartContext";
import type { Product } from "@/lib/products";

const ProductGrid: FC = () => {
  const { getProducts } = useCart();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };
    fetchProducts();
  }, [getProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to EcoShop</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of sustainable and high-quality
          products. From electronics to lifestyle items, find everything you
          need in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
