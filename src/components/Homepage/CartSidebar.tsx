import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useCart } from "@/context/cartContext";
import { Badge } from "../ui/badge";
import CheckoutModal from "./Checkout";

const CartSidebar: FC = () => {
  const {
    state,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    showCheckout,
    setShowCheckout,
  } = useCart();

  console.log(showCheckout);

  if (state.isOpen) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <Badge variant="secondary">{state.items.length}</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <img
                          src={item.product.image ?? "/placeholder.svg"}
                          alt={item.product.title}
                          className="object-cover rounded-md w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          {item.quantity > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.product.id, -1)
                              }
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                          )}
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-destructive hover:text-destructive h-6 text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className=" p-4 space-y-4">
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowCheckout(true)}
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
        {showCheckout && <CheckoutModal />}
      </>
    );
  }
};

export default CartSidebar;
