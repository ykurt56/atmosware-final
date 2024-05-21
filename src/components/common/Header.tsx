import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeHeader = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <header className="bg-black text-white py-2">
      <div className="container mx-auto justify-center items-center">
        <div className="text-center">
          <span className="text-sm">
            Sign up and get 20% off to your first order.{" "}
            <Link to={"/signup"}>
              <u>Sign Up Now</u>
            </Link>
          </span>
          <div className="flex float-end cursor-pointer p-1">
            <IoMdClose className="text-xl" onClick={closeHeader} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
