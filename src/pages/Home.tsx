import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import BrandSection from "../components/home/BrandSection";
import NewProduct from "../components/home/NewProduct";
import TopProduct from "../components/home/TopProduct";
import CatagoryProduct from "../components/home/CatagoryProduct";
import HappyCustomers from "../components/common/HappyCustomers";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <BrandSection />
      <NewProduct />
      <TopProduct />
      <CatagoryProduct />
      <HappyCustomers />
    </div>
  );
};

export default Home;
