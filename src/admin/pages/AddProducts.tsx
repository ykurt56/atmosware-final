import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Navbar from "./Navbar";

const AddProducts: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductForm />
            <ProductList />
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
