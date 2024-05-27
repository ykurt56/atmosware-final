import React, { useState } from "react";
import HappyCustomers from "../common/HappyCustomers";
import ProductTypes from "../../types/ProductTypes";

const DetailFooterbar: React.FC<{ product: ProductTypes }> = ({ product }) => {
  const [activeContent, setActiveContent] = useState<
    "productDetails" | "HappyCustomers" | "FAQs"
  >("HappyCustomers");

  const handleContentChange = (
    content: "productDetails" | "HappyCustomers" | "FAQs"
  ) => {
    setActiveContent(content);
  };

  return (
    <div className="container mx-auto  text-center">
      <div className="grid grid-cols-3">
        <div
          onClick={() => handleContentChange("productDetails")}
          className={`cursor-pointer border-b-2 ${
            activeContent === "productDetails" ? "border-b-2 border-black" : ""
          }`}
        >
          <p className="text-sm">Product Details</p>
        </div>
        <div
          onClick={() => handleContentChange("HappyCustomers")}
          className={`cursor-pointer border-b-2 ${
            activeContent === "HappyCustomers" ? "border-b-2 border-black" : ""
          }`}
        >
          <p className="text-sm">Rating & Reviews</p>
        </div>
        <div
          onClick={() => handleContentChange("FAQs")}
          className={`cursor-pointer border-b-2 ${
            activeContent === "FAQs" ? "border-b-2 border-black" : ""
          }`}
        >
          <p className="text-sm">FAQs</p>
        </div>
      </div>

      <div className="mt-4">
        {activeContent === "productDetails" && (
          <p className="text-xl  font-semibold">{product.description}</p>
        )}
        {activeContent === "HappyCustomers" && <HappyCustomers />}
        {activeContent === "FAQs" && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            doloribus repudiandae asperiores itaque, aperiam voluptates dolores
            voluptatibus laboriosam, delectus repellendus iusto ipsum
            aspernatur? Animi reprehenderit beatae eveniet temporibus, corrupti
            maiores.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailFooterbar;
