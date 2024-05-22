import React from "react";
import versace from "../../assets/brands/versace.png";
import zara from "../../assets/brands/zara.png";
import gucci from "../../assets/brands/gucci.png";
import prada from "../../assets/brands/prada.png";
import calvinKlein from "../../assets/brands/calvin-klein.png";

const BrandSection: React.FC = () => {
  return (
    <div className="bg-black h-28 flex justify-center items-center">
      <div className="flex justify-center items-center space-x-28 ">
        <img src={versace} alt="Versace Logo" className="h-8" />
        <img src={zara} alt="Zara Logo" className="h-8" />
        <img src={gucci} alt="Gucci Logo" className="h-8" />
        <img src={prada} alt="Prada Logo" className="h-8" />
        <img src={calvinKlein} alt="Calvin Klein Logo" className="h-8" />
      </div>
    </div>
  );
};

export default BrandSection;
