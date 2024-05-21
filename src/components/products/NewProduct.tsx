import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const NewProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const newProducts = await fetchProducts();
        setProducts(newProducts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    getNewProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="text-5xl font-extrabold text-center py-20  ">
        NEW ARRIVALS
      </h1>
    </div>
  );
};

export default NewProduct;
