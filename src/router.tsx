import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading/Loading";
import ProductDetailWrapper from "./components/Homepage/ProductDetails";
import ProductGrid from "./components/Homepage/ProductGrid";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Homepage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <ProductGrid />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <ProductDetailWrapper />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
