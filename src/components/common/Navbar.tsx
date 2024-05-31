import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { MdClose, MdKeyboardArrowDown, MdMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { useFormik } from "formik";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { LiaCartArrowDownSolid } from "react-icons/lia";

interface FormValues {
  search: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const username = localStorage.getItem("userName")?.toUpperCase();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Oturumu kaldır
    localStorage.removeItem("User_ID"); // Oturumu kaldır
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    window.location.reload(); // Sayfayı yenile
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      search: "", // Arama değeri
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // Burada arama işlemlerini gerçekleştirebilirsiniz
    },
  });
  return (
    <div>
      <Header />
      {!isLoggedIn && (
        <div className="container mx-auto flex justify-center">
          <Link to="/">
            <h1 className="text-4xl font-extrabold inline-block mx-auto py-4">
              L O G O
            </h1>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <nav className="bg-white text-black py-4  ">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <div className=" hidden md:flex items-center ">
                <Link to="/" className="mr-6">
                  <h1 className="text-4xl font-extrabold">L O G O</h1>
                </Link>
              </div>

              <div className="md:hidden ml-2  flex items-center">
                <button onClick={toggleMobileMenu} className="mr-4">
                  {isMenuOpen ? (
                    <MdClose className="text-2xl" />
                  ) : (
                    <MdMenu className="text-2xl" />
                  )}
                </button>
                <div className="flex items-center ">
                  <Link to="/" className="mr-6">
                    <h1 className="text-3xl font-extrabold">L O G O</h1>
                  </Link>
                </div>
              </div>

              <div className="md:block hidden ">
                <Link to="/products" className="mx-2">
                  On Sale
                </Link>
                <Link to="/category/men's%20clothing" className="mx-2">
                  Men
                </Link>
                <Link to="/category/women's%20clothing" className="mx-2">
                  Women
                </Link>
                <Link to="/category/jewelery" className="mx-2">
                  Jewelery
                </Link>
              </div>
            </div>

            <div className=" flex items-center lg:flex-grow mx-3 ">
              <span className="lg:absolute ml-3 ">
                <IoSearch
                  className="lg:text-gray-400 text-2xl "
                  onClick={toggleSearch}
                />
              </span>
              <form
                onSubmit={formik.handleSubmit}
                className="flex items-center w-full"
              >
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="p-2 pl-10 border border-gray-300 rounded-full lg:flex-grow bg-gray-200 hidden lg:block"
                  name="search-web"
                  onChange={formik.handleChange}
                />
              </form>
              <div className="ml-4 flex items-center">
                {localStorage.getItem("isLoggedIn") ? (
                  <div className="flex items-center">
                    <Link to="/cart" className="mr-4">
                      <FiShoppingCart className="text-2xl" />
                    </Link>

                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          setIsUserDropdownOpen(!isUserDropdownOpen)
                        }
                      >
                        <VscAccount className="text-2xl" />
                      </button>
                      {isUserDropdownOpen && (
                        <div className=" absolute mt-28 z-20 bg-white shadow-md rounded p-4">
                          <span className=" text-sm  max-w-sm lg:w-max ">
                            {username}{" "}
                          </span>
                          <button
                            className="flex items-center"
                            onClick={handleLogout}
                          >
                            <p className=" text-sm mr-2  max-w-sm lg:w-max ">
                              Logout
                            </p>
                            <RiLogoutCircleLine className="text-2xl" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Link to="/login" className="mr-4 flex">
                      {/* <p className=" text-sm mr-1 w-max">Login </p> */}
                      <RiLoginCircleLine className="text-2xl" />
                    </Link>
                    <Link to="/signup" className="flex ">
                      {/* <p className=" text-sm mr-1 w-max ">Register</p> */}
                      <LiaCartArrowDownSolid className="text-2xl wm" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-2">
              <div className="bg-white shadow-md rounded p-4">
                <div className="flex flex-col">
                  <div className="relative inline-block mb-2">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={toggleMenu}
                    >
                      <button className=" focus:outline-none">Shop</button>
                      <MdKeyboardArrowDown className="mx-2" />
                    </div>
                    {isOpen && (
                      <ul className="absolute bg-white mt-1 p-2 rounded shadow-md">
                        <Link to={"/men"}>
                          <li>Men</li>
                        </Link>
                        <Link to={"/woman"}>
                          <li>Woman</li>
                        </Link>
                        <Link to={"/jewelry"}>
                          <li>Jewelry</li>
                        </Link>
                      </ul>
                    )}
                  </div>
                  <Link to="/sales" className="mb-2">
                    On Sale
                  </Link>
                  <Link to="/new-arrivals" className="mb-2">
                    New Arrivals
                  </Link>
                  <Link to="/brands" className="mb-2">
                    Brands
                  </Link>
                </div>
              </div>
            </div>
          )}

          {isSearchOpen && (
            <div className="lg:hidden mt-2">
              <div className="bg-white shadow-md rounded p-4">
                <div className="flex flex-col">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="p-2 pl-10 border border-gray-300 rounded-full w-full flex-grow bg-gray-200"
                      name="search"
                      value={formik.values.search}
                      onChange={formik.handleChange}
                    />
                  </form>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
