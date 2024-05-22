import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import customers from "../../services/Customer";

const HappyCustomers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? customers.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === customers.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Our Happy Customers
        </h1>
        <div className="flex space-x-2">
          <button
            className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 translate-x-6"
          style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
        >
          {customers.map((customer) => (
            <div key={customer.id} className="flex-shrink-0 w-1/3 px-4">
              <div className="bg-white rounded-xl border p-6 h-full">
                <div className="flex  space-x-1 mb-4">
                  {Array.from({ length: customer.rating }).map((_, index) => (
                    <AiFillStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <div className="flex  space-x-2 mb-4">
                  <h3 className="text-xl font-bold">{customer.name}</h3>
                  {customer.verified && (
                    <FaCheckCircle className="text-green-500 mt-2" />
                  )}
                </div>
                <p className="text-lg text-gray-600">{customer.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyCustomers;
