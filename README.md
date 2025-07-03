# EcoShop – E-commerce React Website

EcoShop is a modern, responsive e-commerce web application built with React, TypeScript, and Tailwind CSS. It features a clean UI, products, cart , and a smooth checkout experience.

## Live Link & Server side

[Link link](https://gilded-alfajores-5d5d0c.netlify.app)
[Server Side Code](https://github.com/wolfiee42/e-commerce-website-backend)

## Features

- **Product Listing:** Collection of products fetched from a backend API.
- **Product Details:** View detailed information of each product.
- **Add to Cart:** Add products to your cart from the product grid or details page.
- **Cart Sidebar:** View and manage your cart with a smooth sliding sidebar.
- **Quantity Management:** Increase, decrease, or remove items from your cart.
- **Persistent Cart:** Cart contents are saved in localStorage.
- **Checkout Modal:** Begin the checkout process from the cart sidebar.
- **Responsive Design:** Works great on desktop and mobile devices.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, ShadCN
- **State Management:** React Context API
- **Routing:** React Router
- **API:** Axios (fetches products from a REST API)
- **Icons:** Lucide React

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **API:** Axios (fetches products from a REST API)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- pnpm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/wolfiee42/e-commerce-website
   cd e-commerce-website
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```sh
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
src/
  components/
    Homepage/
      Navbar.tsx
      ProductGrid.tsx
      ProductCard.tsx
      ProductDetails.tsx
      CartSidebar.tsx
      Checkout.tsx
  context/
    cartContext.tsx
  lib/
    products.ts
  pages/
    Homepage.tsx
  App.tsx
  main.tsx
```

## Customization

- **API Endpoint:**  
  The product API endpoint is set in `cartContext.tsx`. You can change it to your own backend if needed.

- **Styling:**  
  Tailwind CSS is used for styling. You can easily customize the look and feel by editing the utility classes.

## Deployment

You can deploy this app to Vercel, Netlify, or any static hosting provider that supports React.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy shopping with EcoShop!**
cd ecoshop

````

2. **Install dependencies:**

```sh
npm install
# or
yarn install
````

3. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
src/
  components/
    Homepage/
      Navbar.tsx
      ProductGrid.tsx
      ProductCard.tsx
      ProductDetails.tsx
      CartSidebar.tsx
      Checkout.tsx
  context/
    cartContext.tsx
  lib/
    products.ts
  pages/
    Homepage.tsx
  App.tsx
  main.tsx
```

## Customization

- **API Endpoint:**  
  The product API endpoint is set in `cartContext.tsx`. You can change it to your own backend if needed.

- **Styling:**  
  Tailwind CSS is used for styling. You can easily customize the look and feel by editing the utility classes.

## Deployment

Deployed this app to Netlify.

## License

This project is open source and available under the [MIT License](LICENSE).

---
