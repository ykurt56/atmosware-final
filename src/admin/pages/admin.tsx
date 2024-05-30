import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductForm />
          <ProductList />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Admin;
