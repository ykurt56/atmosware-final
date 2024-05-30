import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";

const Size: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-4 container mx-auto">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-4">Size</h3>
          <MdOutlineChevronRight />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button className="px-8 py-2 text-sm  rounded-full bg-gray-300 focus:bg-black focus:text-white">
              Small
            </button>
            <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
              Medium
            </button>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
              Large
            </button>
            <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
              X-Large
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Size;
