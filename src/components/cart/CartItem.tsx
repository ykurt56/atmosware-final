import React from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CartItemProps {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  size,
  price,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div>
      <div className="w-full flex items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm ">
        <Link
          to={`/products/${id.split("-")[0]}`}
          className="w-full flex items-center"
        >
          <img src={image} alt={name} className="w-24 h-24 rounded-lg" />
          <div className="ml-4 flex-1">
            <h2 className="text-lg line-clamp-1 lg:line-clamp-none font-bold">
              {name}
            </h2>
            <p className="text-gray-600">Size: {size}</p>
            <p className="text-xl font-bold mt-2">${price * quantity}</p>{" "}
            {/* Toplam fiyatı hesapla */}
          </div>
        </Link>
        <div className="flex items-center ml-16  max-w-80 ">
          <button
            onClick={() => onQuantityChange(id, quantity - 1)}
            className="bg-gray-200 p-2 rounded-l-full flex items-center justify-center"
          >
            <FaMinus />
          </button>
          <span className="bg-gray-200 px-4 py-1">
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
              className="w-8 text-center"
            />
          </span>
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
    </div>
  );
};

export default CartItem;
