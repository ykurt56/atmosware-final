// src/components/common/Navbar.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Header />
      <nav className="bg-white text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link to="/" className="mr-6">
                <h1 className="text-4xl font-extrabold">L O G O</h1>
              </Link>
            </div>
            <div className="relative inline-block">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                <button className=" focus:outline-none">Shop</button>
                <MdKeyboardArrowDown className="mx-2" />
              </div>
              {isOpen && (
                <ul className="absolute bg-white mt-1 p-2 rounded shadow-md">
                  <li>Category 1</li>
                  <li>Category 1</li>
                  <li>Category 1</li>
                </ul>
              )}
            </div>
            <Link to="/sales" className="mx-2">
              On Sale
            </Link>
            <Link to="/new-arrivals" className="mx-2">
              New Arrivals
            </Link>
            <Link to="/brands" className="mx-2">
              Brands
            </Link>
          </div>
          <div className="flex items-center flex-grow mx-3">
            <span className="absolute ml-3">
              <IoSearch className="text-gray-400 text-2xl " />
            </span>
            <input
              type="text"
              placeholder="Search for products..."
              className="p-2 pl-10 border border-gray-300 rounded-full flex-grow bg-gray-200"
            />
            <div className="ml-4 flex items-center">
              <div className="mr-4">
                <FiShoppingCart className="text-2xl" />
              </div>
              <div className="mr-4">
                <VscAccount className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
