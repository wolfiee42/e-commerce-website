export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Premium wireless headphones with noise cancellation technology. Enjoy crystal-clear audio quality with up to 30 hours of battery life. Perfect for music lovers and professionals.",
    category: "Electronics",
    rating: 4.5,
    stock: 15,
  },
  {
    id: "2",
    title: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone connectivity. Track your workouts, monitor your health, and stay connected on the go.",
    category: "Wearables",
    rating: 4.3,
    stock: 8,
  },
  {
    id: "3",
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Comfortable and sustainable organic cotton t-shirt. Made from 100% organic materials with a soft, breathable fabric that's perfect for everyday wear.",
    category: "Clothing",
    rating: 4.7,
    stock: 25,
  },
  {
    id: "4",
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Durable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free with a leak-proof design, perfect for outdoor activities.",
    category: "Lifestyle",
    rating: 4.6,
    stock: 30,
  },
  {
    id: "5",
    title: "Wireless Phone Charger",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection for safe, convenient charging.",
    category: "Electronics",
    rating: 4.2,
    stock: 12,
  },
  {
    id: "6",
    title: "Eco-Friendly Notebook Set",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Set of 3 notebooks made from recycled paper with hardcover binding. Perfect for journaling, note-taking, or sketching. Includes dotted, lined, and blank pages.",
    category: "Stationery",
    rating: 4.4,
    stock: 20,
  },
  {
    id: "7",
    title: "Portable Bluetooth Speaker",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Compact wireless speaker with powerful sound and deep bass. Waterproof design with 12-hour battery life, perfect for outdoor adventures and parties.",
    category: "Electronics",
    rating: 4.5,
    stock: 18,
  },
  {
    id: "8",
    title: "Minimalist Desk Lamp",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Modern LED desk lamp with adjustable brightness and color temperature. Touch controls and USB charging port make it perfect for any workspace.",
    category: "Home & Office",
    rating: 4.3,
    stock: 10,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
