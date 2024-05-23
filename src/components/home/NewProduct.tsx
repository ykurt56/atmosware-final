import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import Product from "../../types/ProductTypes";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating: React.FC<{ rate: number }> = ({ rate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i - rate < 1) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex items-center">{stars}</div>;
};

const NewProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const discountPercentage: number = 20;

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const newProducts = await fetchProducts();
        setProducts(newProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    getNewProducts();
  }, []);

  return (
    <div className="h-auto w-full">
      <h1 className="text-5xl font-extrabold text-center py-20">
        NEW ARRIVALS
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <div className="h-60  bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-auto">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover mb-4 rounded-full  h-full"
                />
              </div>
              <div>
                <h2 className="md:text-xl font-bold mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <div className="flex items-center gap-2">
                  <StarRating rate={product.rating.rate} />
                  <p className="">{product.rating.rate}</p>
                  <p className=" hidden md:block text-gray-600">
                    {product.rating.count} reviews
                  </p>
                </div>
                <div className="  text-black font-semibold flex  flex-row  lg:items-center gap-4">
                  <h3 className=" md:text-2xl">${product.price}</h3>
                  {product.price >= 50 && (
                    <div className="block md:flex gap-2 md:text-xl lg:text-2xl">
                      <p className="text-gray-500 line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </p>
                      <div className="items-center justify-center bg-red-100 rounded-full px-3 text-red-600 md:text-lg">
                        %{discountPercentage}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex py-5 justify-center mx-auto border-b-[1px]">
          <button
            onClick={() => (window.location.href = "/new-arrivals")}
            className="bg-white text-black border px-16 py-3 rounded-full mb-8"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
