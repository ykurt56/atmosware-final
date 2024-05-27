import React from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";

interface CartItemProps {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  size,
  color,
  price,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className=" w-full flex items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm ">
      <img src={image} alt={name} className="w-24 h-24 rounded-lg" />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">Size: {size}</p>
        <p className="text-gray-600">Color: {color}</p>
        <p className="text-xl font-bold mt-2">${price}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onQuantityChange(id, quantity - 1)}
          className="bg-gray-200 p-2 rounded-l-full flex items-center justify-center"
        >
          <FaMinus />
        </button>
        <span className="bg-gray-200 px-4 py-1">{quantity}</span>
        <button
          onClick={() => onQuantityChange(id, quantity + 1)}
          className="bg-gray-200 p-2 rounded-r-full flex items-center justify-center"
        >
          <FaPlus />
        </button>
      </div>
      <button onClick={() => onRemove(id)} className="ml-4 text-red-500">
        <FaTrashAlt size={20} />
      </button>
    </div>
  );
};

export default CartItem;
