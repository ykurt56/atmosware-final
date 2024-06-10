import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { MdClose, MdMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { useFormik } from "formik";
import {
  RiAdminLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { getProducts } from "../../services/productApi";
import SearchResultsList from "../navbar/SearchResultsList";
import ProductTypes from "../../types/ProductTypes";
import { ToastContainer, toast } from "react-toastify";
import { getCartItem } from "../../services/cartApi";
interface FormValues {
  search: string;
  searchweb: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [cartItems, setCartItems] = useState<Array<object>>([{}]);

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("User_ID");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    toast.success(`Logout Successful`);
    setIsLoggedIn(false);
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      search: "",
      searchweb: "",
    },
    onSubmit: async (values) => {
      try {
        const products = await getProducts();
        const search = (values.search || values.searchweb || "").toLowerCase();

        if (search === "" || search === " " || search === null) {
          setSearchResults([]);
          return;
        }
        const filteredProducts = products.filter((product: ProductTypes) =>
          product.title.toLowerCase().includes(search)
        );

        setSearchResults(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });

  const fetchcartItems = async () => {
    const user = localStorage.getItem("User_ID");
    if (user) {
      try {
        const cartItems = await getCartItem(user);
        setCartItems(cartItems);
      } catch (error) {
        toast.error("Sepet öğeleri alınırken bir hata oluştu:");
      }
    }
  };

  useEffect(() => {
    formik.handleSubmit();

    fetchcartItems();
  }, []);

  useEffect(() => {
    fetchcartItems();
  }, [cartItems]);

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
                  name="searchweb"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.handleSubmit();
                  }}
                  value={formik.values.searchweb}
                />
              </form>

              <div className="ml-4 flex items-center">
                {localStorage.getItem("isLoggedIn") ? (
                  <div className="flex items-center">
                    <Link to="/cart" className="mr-4 relative">
                      <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full px-1 flex items-center justify-center">
                        {cartItems.length > 0 ? cartItems.length : ""}
                      </span>
                      <FiShoppingCart className="text-2xl text-black" />
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
                        <div className=" absolute right-0  mt-28 z-20 bg-white shadow-md rounded p-4">
                          <span className=" text-sm  max-w-sm lg:w-max ">
                            {username}
                          </span>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center mb-2"
                            >
                              <p className=" text-sm mr-2  max-w-sm lg:w-max ">
                                Admin
                              </p>
                              <RiAdminLine className="text-2xl" />
                            </Link>
                          )}

                          <button
                            className="flex items-center "
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
                      <RiLoginCircleLine className="text-2xl" />
                    </Link>
                    <Link to="/signup" className="flex ">
                      sss
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
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.handleSubmit();
                      }}
                    />
                  </form>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
      {searchResults.length > 0 && (
        <SearchResultsList searchResults={searchResults} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Navbar;
