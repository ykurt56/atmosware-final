import React, { useState } from "react";
import HeroBanner from "../components/home/HeroBanner";
import BrandSection from "../components/home/BrandSection";
import NewProduct from "../components/home/NewProduct";
import TopProduct from "../components/home/TopProduct";
import CatagoryProduct from "../components/home/CatagoryProduct";
import HappyCustomers from "../components/common/HappyCustomers";
import { Link } from "react-router-dom";
import { DiVim } from "react-icons/di";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <div>
      <HeroBanner />
      <BrandSection />
      <div>
        {!isLoggedIn && (
          <div className="flex flex-col items-center justify-center">
            <div className=" absolute bg-gray-100 rounded-lg shadow-md p-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 items-center justify-center z-10">
              <h2 className="text-3xl font-extrabold text-red-600 mb-4 text-center">
                Ürünleri görebilmek için giriş yapın veya kayıt olun
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center">
                Henüz üye değil misiniz? Hemen kaydolun ve harika ürünlerimizi
                keşfetmeye başlayın.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gray-400 text-gray-800 font-semibold rounded-lg hover:bg-gray-500 transition-colors duration-300"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
            <div className="blur-sm mt-6">
              <NewProduct />
              <TopProduct />
            </div>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div>
          <NewProduct />
          <TopProduct />
        </div>
      )}
      <CatagoryProduct />
      <HappyCustomers />
    </div>
  );
};

export default Home;
