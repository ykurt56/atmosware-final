import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    image: "https://via.placeholder.com/100",
    quantity: 1,
  },
  {
    id: 2,
    name: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    image: "https://via.placeholder.com/100",
    quantity: 1,
  },
  {
    id: 3,
    name: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    image: "https://via.placeholder.com/100",
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
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
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
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
