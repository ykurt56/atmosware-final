import React from "react";
import { Link } from "react-router-dom";

const CategoryProduct: React.FC = () => {
  return (
    <div className="bg-brand-100 container mx-auto rounded-3xl p-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8">
        Browse by Category
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3  ">
        <Link to="/category/men's%20clothing">
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <img
              src="../../../src/assets/catagory/men.jpg"
              alt="Men"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center ">
              <h2 className="text-white lg:text-3xl xl:text-4xl font-bold text-center bg-gray-900  p-5 rounded-xl ">
                Men's Clothing
              </h2>
            </div>
          </div>
        </Link>
        <Link to="/category/women's%20clothing">
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <img
              src="../../../src/assets/catagory/woman.jpg"
              alt="Woman"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white lg:text-3xl xl:text-4xl font-bold text-center bg-gray-900  p-5 rounded-xl ">
                Woman's Clothing
              </h2>
            </div>
          </div>
        </Link>
        <Link to="/category/jewelery">
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <img
              src="../../../src/assets/catagory/jewelry.jpg"
              alt="Jewelry"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white lg:text-3xl xl:text-4xl font-bold text-center bg-gray-900  p-5 rounded-xl ">
                Jewelry
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryProduct;
