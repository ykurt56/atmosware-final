import React from "react";
import HeroBanner from "../components/sections/HeroBanner";
import BrandSection from "../components/sections/BrandSection";
import NewProduct from "../components/products/NewProduct";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <BrandSection />
      <NewProduct />
    </div>
  );
};

export default Home;
