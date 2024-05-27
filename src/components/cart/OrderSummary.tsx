import React, { useState } from "react";
import { FaTag, FaCheck } from "react-icons/fa";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onApplyPromoCode: (code: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  deliveryFee,
  total,
  onApplyPromoCode,
}) => {
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromoCode = () => {
    onApplyPromoCode(promoCode);
    setPromoCode("Promo Code Applied");
  };

  return (
    <div className="w-1/3 bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount (-20%)</span>
          <span className="text-red-500">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-bold mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-2"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button
          onClick={handleApplyPromoCode}
          className="bg-black text-white px-4 rounded-r-lg flex items-center"
        >
          <FaTag className="mr-2" />
          Apply
        </button>
      </div>
      <button className="bg-black text-white w-full py-3 rounded-lg font-bold flex items-center justify-center">
        <FaCheck className="mr-2" />
        Go to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
