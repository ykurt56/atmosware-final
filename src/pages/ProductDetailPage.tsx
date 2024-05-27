import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductTypes from "../types/ProductTypes";
import StarRating from "../components/common/StarRating";
import ColorButtons from "../components/products/ColorButtons";

interface ProductDetailProps {
  products: ProductTypes[];
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id?: string }>();
  const [quantity, setQuantity] = useState(1);

  if (!id) {
    return <div>No product ID specified</div>;
  }

  const product = products.find((product) => product.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (operation: string) => {
    setQuantity((prevQuantity) => {
      if (operation === "increment") {
        return prevQuantity + 1;
      } else if (operation === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto flex">
        <div className="w-1/2 mx-10">
          <div className="flex gap-4">
            <div className="flex flex-col ">
              <button
                key={product.id}
                className="w-28 bg-brand-100 rounded-lg shadow-lg p-4 mb-4 focus:border focus:border-black"
              >
                <img
                  src={product.image}
                  alt={`Product thumbnail ${product.image}`}
                  className="w-28"
                />
              </button>

              <button
                key={product.id}
                className="w-28 bg-brand-100 rounded-lg shadow-lg p-4 mb-4 focus:border focus:border-black"
              >
                <img
                  src={product.image}
                  alt={`Product thumbnail ${product.image}`}
                  className="w-28"
                />
              </button>

              <button
                key={product.id}
                className="w-28 bg-brand-100 rounded-lg shadow-lg p-4 mb-4 focus:border focus:border-black"
              >
                <img
                  src={product.image}
                  alt={`Product thumbnail ${product.image}`}
                  className="w-28"
                />
              </button>
            </div>
            <div className="mx-10 w-full justify-center items-center ">
              <div className="w-full">
                <img
                  src={product.image}
                  alt="Product main"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 mx-10">
          <h1 className="text-4xl font-black">{product.title}</h1>
          <div className="flex items-center my-4">
            <StarRating rate={product.rating.rate} />
            <span className="ml-2 text-gray-500">{product.rating.rate}</span>
            <span className="ml-2 text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <div className="my-4 pb-3 border-b-2 ">
            <span className="text-2xl font-semibold text-red-600">
              ${product.price}
            </span>
            <span className="ml-2 text-xl text-gray-500 line-through">
              ${product.price}
            </span>
            <span className="ml-2 text-xl text-green-600"></span>
          </div>
          <p className="text-gray-700 my-4 border-b-2 pb-2">
            {product.description}
          </p>
          <div className="my-4 pb-3 border-b-2">
            <div className="flex space-x-2">
              <ColorButtons />
            </div>
          </div>
          <div className="my-4 pb-3 border-b-2">
            <label className="block text-gray-700">Choose Size</label>
            <div className="flex space-x-2">
              {["Small", "Medium", "Large", "X-Large"].map((size, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 border ${
                    size === "Large" ? "border-black" : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="my-4 flex items-center ">
            <button
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-l-full "
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span className="py-2 px-4 bg-gray-200 text-gray-700 ">
              {quantity}
            </span>
            <button
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-r-full "
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
            <button className="ml-4 py-2 px-4 bg-black text-white  w-full rounded-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
