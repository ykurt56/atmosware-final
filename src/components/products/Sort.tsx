import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { MdOutlineChevronRight, MdOutlinePriceChange } from "react-icons/md";

interface SortProps {
  onSortPrice: (order: string) => void;
  onSortAZ: (order: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortPrice, onSortAZ }) => {
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenAz, setIsOpenAz] = useState(false);

  const handleSortPrice = (order: string) => {
    onSortPrice(order);
    setIsOpenPrice(false);
  };

  const handleSortAZ = (order: string) => {
    onSortAZ(order);
    setIsOpenAz(false);
  };

  return (
    <div className="container mx-auto mb-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">SORT BY</h3>
        <MdOutlineChevronRight />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  w-full ">
        <div className="relative">
          <button
            onClick={() => setIsOpenPrice(!isOpenPrice)}
            className="flex  items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Price <BsChevronDown className="ml-1" />
          </button>
          {isOpenPrice && (
            <div className="absolute z-10 mt-2 rounded-md shadow-lg right-0">
              <div className="py-1 bg-white rounded-md shadow-xs">
                <button
                  onClick={() => handleSortPrice("asc")}
                  className="block w-max px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Low to High <MdOutlinePriceChange className="inline" />
                </button>
                <button
                  onClick={() => handleSortPrice("desc")}
                  className="block w-max px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  High to Low <MdOutlinePriceChange className="inline" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative mx-auto">
          <button
            onClick={() => setIsOpenAz(!isOpenAz)}
            className="flex  items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            A-Z <BsChevronDown className="ml-1" />
          </button>
          {isOpenAz && (
            <div className="absolute z-10  rounded-md shadow-lg right-0">
              <div className="py-1 bg-white rounded-md shadow-xs">
                <button
                  onClick={() => handleSortAZ("asc")}
                  className="block w-max  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
                >
                  Low to High <AiOutlineSortAscending className="inline" />
                </button>
                <button
                  onClick={() => handleSortAZ("desc")}
                  className="block w-max px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  High to Low <AiOutlineSortDescending className="inline" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;
