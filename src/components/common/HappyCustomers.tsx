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
    <div className="container mx-auto py-8 md:py-20">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-black">Our Happy Customers</h1>
        <div className=" flex text-base space-x-2">
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
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / (customers.length - 2)
            }%)`,
          }}
        >
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex-shrink-0 w-full md:w-1/3 px-4"
            >
              <div className="bg-white rounded-xl border p-6 h-full mb-4 md:mb-0">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: customer.rating }).map((_, index) => (
                    <AiFillStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold">{customer.name}</h3>
                  {customer.verified && (
                    <FaCheckCircle className="text-green-500 " />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {customer.testimonial}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyCustomers;
