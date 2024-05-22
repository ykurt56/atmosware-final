import React from "react";
import { BsStars } from "react-icons/bs";

const HeroBanner: React.FC = () => {
  return (
    <div className="h-[663px] bg-brand-100 flex items-center">
      <div className="container mx-auto px-4 ">
        <div className="max-w-xl mx-auto">
          <h2 className="font-extrabold text-6xl  mb-4 mx-auto">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h2>
          <p className=" text-gray-600 mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white px-16 py-3 rounded-full mb-8">
            Shop Now
          </button>
          <div className="flex ">
            <div className="items-center mr-8 border-r-2 pr-4">
              <span className="text-4xl font-bold">200+</span>
              <p className="text-gray-600 w-max">International Brands</p>
            </div>
            <div className="items-center mr-8 border-r-2 px-4">
              <span className="text-4xl font-bold">2,000+</span>
              <p className="text-gray-600 w-max ">High-Quality Products</p>
            </div>
            <div className="items-center mr-8">
              <span className="text-4xl font-bold">30,000+</span>
              <p className="text-gray-600 w-max">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full container mx-auto overflow-hidden">
        <div className="h-full relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/b26f/ea69/ccfd8aa5825862cdb9604a4fb4930464?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TvxVU-Cpe5Zm39lM~C4r7XvuxN88nMh2JlrjEmOIOSiFrfrV9AJcOq8bUEcJZQNuoc2cIuyzBmBo1bCBZXAk4wDX6L6i4zD~tcdeD5gP7SBlWT1594zHL2SyKO01IqeknnASK6ZSxOAHW4rnI78xe9yORlp3gjv3DwklLyDFFHcxBTAWdPzlb3URggSvYOCJu1NXf0tbfu3B9HST1pmoK1Bib9cvfsrFUXAfB5ScaJayzHHu0rz0wEXPbRN6zK7-OzB3-V938vuFOfPjOAAd55ttA4xaphgXMIcFly7sgFHXGm8GUy2Gz1zcQ2YnXofpdnFxZD5bpGNdzClPj6wF8Q__"
            alt="Brand 1"
            className="max-w-[630px] rounded-lg object-cover "
          />
        </div>
        <div className=" overflow-hidden ">
          <BsStars className="text-8xl absolute top-1/4 right-20" />

          <BsStars className="text-6xl  absolute top-1/2 left-1/5 " />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
