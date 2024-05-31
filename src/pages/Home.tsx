import React, { useState } from "react";
import HeroBanner from "../components/home/HeroBanner";
import BrandSection from "../components/home/BrandSection";
import NewProduct from "../components/home/NewProduct";
import TopProduct from "../components/home/TopProduct";
import CatagoryProduct from "../components/home/CatagoryProduct";
import HappyCustomers from "../components/common/HappyCustomers";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <div>
      <HeroBanner />
      <BrandSection />

      {isLoggedIn && (
        <div>
          <NewProduct />
          <TopProduct />
          <CatagoryProduct />
        </div>
      )}
      <HappyCustomers />
    </div>
  );
};

export default Home;
