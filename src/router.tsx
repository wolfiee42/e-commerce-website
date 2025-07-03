import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading/Loading";
import Homepage from "@/pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Homepage />
      </Suspense>
    ),
  },
]);

export default router;
