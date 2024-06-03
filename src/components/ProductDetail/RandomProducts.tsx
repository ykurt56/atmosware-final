import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productApi";
import ProductTypes from "../../types/ProductTypes";
import StarRating from "../common/StarRating";
import { Link } from "react-router-dom";

const RandomProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        const randomSelection = getRandomProducts(products, 4);
        setRandomProducts(randomSelection);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (products: ProductTypes[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleProductClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">You might also like</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {randomProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="mx-2"
            onClick={handleProductClick}
          >
            <Link to={`/products/${product.id}`}>
              <div className="h-60 bg-brand-100 rounded-lg shadow-lg p-4 mt-4 md:h-3/4 flex justify-center items-center mx-auto">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover mb-4 rounded-full h-full"
                />
              </div>
              <div>
                <h2 className="md:text-xl font-bold mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <div className="flex items-center gap-2">
                  <StarRating rate={product.rating.rate} />
                  <p>{product.rating.rate}</p>
                  <p className="hidden md:block text-gray-600">
                    {product.rating.count} reviews
                  </p>
                </div>
                <div className="text-black font-semibold flex flex-row lg:items-center gap-4 mb-8">
                  <h3 className="md:text-2xl">${product.price}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
