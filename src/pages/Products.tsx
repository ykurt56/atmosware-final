import React from "react";
import Filters from "../components/products/Filters";

const Products: React.FC = () => {
  return (
    <div className="container mx-auto ">
      <div className="mx-10">
        <Filters />
      </div>
    </div>
  );
};

export default Products;
