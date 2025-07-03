import type React from "react";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CheckoutModal = () => {
  const { getTotalPrice, removeAll, closeCart, setShowCheckout } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Clear cart and close modals after success
    setTimeout(() => {
      removeAll();
      closeCart();
      setShowCheckout(false);
      setIsSuccess(false);
      setFormData({ name: "", email: "", address: "" });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 ">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Order Placed!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCheckout(false)}
                className="hover:cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete shipping address"
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-lg font-bold text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
