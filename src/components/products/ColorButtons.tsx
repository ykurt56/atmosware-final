import React, { useState } from "react";
import { MdCheck } from "react-icons/md";
import { MdOutlineChevronRight } from "react-icons/md";

const ColorButtons: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setSelectedButton(selectedButton === index ? null : index);
  };

  const buttonColors1 = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-orange-500",
  ];
  const buttonColors2 = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-white border border-gray-400",
    "bg-black",
  ];

  const renderButton = (color: string, index: number) => (
    <button
      key={index}
      className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}
      onClick={() => handleButtonClick(index)}
    >
      {selectedButton === index && <MdCheck className="text-white" />}
    </button>
  );

  return (
    <div className="flex flex-col">
      <div className="mb-4 container mx-auto">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-4">Colors</h3>
          <MdOutlineChevronRight />
        </div>

        <div className="flex gap-4 mb-2">
          {buttonColors1.map((color, index) => renderButton(color, index))}
        </div>
        <div className="flex gap-4">
          {buttonColors2.map((color, index) =>
            renderButton(color, index + buttonColors1.length)
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorButtons;
