import React from "react";
import HeroBanner from "../components/sections/HeroBanner";
import BrandSection from "../components/sections/BrandSection";
import NewProduct from "../components/products/NewProduct";
import TopProduct from "../components/products/TopProduct";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <BrandSection />
      <NewProduct />
      <TopProduct />
    </div>
  );
};

export default Home;
