import React from "react";
import Cart from "../components/cart/Cart";

const CartPage: React.FC = () => {
  return (
    <div>
      <h1 className=" container text-2xl md:text-4xl text-center font-black mx-auto">
        YOUR CART
      </h1>

      <Cart />
    </div>
  );
};

export default CartPage;
