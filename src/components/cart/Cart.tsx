import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCartItem,
  deleteCartItem,
  updateCartItemQuantity,
} from "../../services/cartApi";
import { getProduct, updateProduct } from "../../services/productApi";
import { OrderApi } from "../../services/orderApi";
import RandomProducts from "../ProductDetail/RandomProducts";
import CartItemTypes from "../../types/CartItem";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [promeCode, setPromeCode] = useState<boolean>(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user_id: string = localStorage.getItem("User_ID") || "";
      try {
        const initialCartItems = await getCartItem(user_id);
        setCartItems(initialCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };
  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      const item = cartItems.find((item) => item.id == id);
      if (!item) {
        toast.error("Item not found in cart");
        return;
      }

      const product = await getProduct(item.id.split("-")[0]);
      if (product.sizes[item.size] < quantity) {
        toast.error("Not enough stock available");
        return;
      }

      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );

      await updateCartItemQuantity(id, Math.max(1, quantity), item);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleApplyPromoCode = (code: string) => {
    if (code === "rigel") {
      toast.success("Promo code applied: rigel");
      setPromeCode(true);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleBuyProducts = async () => {
    try {
      for (const item of cartItems) {
        const product = await getProduct(item.id.split("-")[0]);

        if (product.sizes && product.sizes[item.size]) {
          if (product.sizes[item.size] >= item.quantity) {
            product.sizes[item.size] -= item.quantity;
            product.stock -= item.quantity;

            await OrderApi(item);

            await updateProduct(item.id.split("-")[0], product);
          } else {
            toast.error(
              "Product information is missing or incorrect: " + item.name
            );
            toast.error("Not enough stock found: " + item.name);

            return;
          }
        } else {
          toast.error("Not enough stock found: " + item.name);
          toast.error(
            "Product information is missing or incorrect: " + item.name
          );
          return;
        }

        await deleteCartItem(item.id);
      }

      toast.success("All items purchased successfully!");
    } catch (error) {
      console.error("Error occurred during purchase:", error);
      toast.error(
        "An error occurred during the purchase process, please try again."
      );
    } finally {
      setCartItems([]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promeCode ? subtotal * 1 : subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div>
      <div className="min-w-screen flex container mx-auto mt-5 ">
        <div className="w-full  block  lg:flex">
          <div className="lg:w-3/4 bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-300 lg:mr-5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  size={item.size}
                  color={item.color}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  onQuantityChange={(id, quantity) =>
                    handleQuantityChange(id, quantity)
                  }
                  onRemove={(id) => handleRemoveItem(id)}
                />
              ))
            ) : (
              <p className="text-center text-red-500 text-xl">
                No items in cart
              </p>
            )}
          </div>
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            onApplyPromoCode={handleApplyPromoCode}
            onBuyProducts={handleBuyProducts}
          />
        </div>
        <ToastContainer />
      </div>
      <RandomProducts />
    </div>
  );
};

export default Cart;
