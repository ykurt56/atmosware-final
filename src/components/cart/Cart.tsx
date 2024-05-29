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

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user_id: string = localStorage.getItem("User_ID") || ""; // Varsayılan değer atama
      console.log(user_id);
      try {
        const initialCartItems = await getCartItem(user_id);
        setCartItems(initialCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Sadece bir kere çalıştır

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };
  console.log(cartItems);
  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      // Yerel durumu güncelle
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );

      // API üzerindeki veriyi güncelle
      await updateCartItemQuantity(
        id,
        Math.max(1, quantity),
        cartItems.find((item) => item.id === id)
      );

      // Bildirim göster
      // toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      // toast.error("Failed to update quantity");
    }
  };

  const handleApplyPromoCode = (code: string) => {
    toast.success(`Promo code applied: ${code}`);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-w-screen flex container mx-auto mt-5 ">
      <div className="w-full  flex">
        <div className="w-3/4 bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-300 mr-5">
          {cartItems.map((item) => (
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
          ))}
        </div>
        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
          onApplyPromoCode={handleApplyPromoCode}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
