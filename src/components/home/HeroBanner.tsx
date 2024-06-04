import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import Register from "../auth/Register";

const HeroBanner: React.FC = () => {
  const [isLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <div>
      {!isLoggedIn && (
        <div className="bg-brand-100 lg:flex  items-center ">
          <div className="container mx-auto px-4 pt-20  ">
            <div className=" mx-auto">
              <h2 className="font-black text-4xl lg:text-6xl  mb-4 mx-auto uppercase">
                To See the Products and Enjoy Shopping to the Fullest
              </h2>
              <p className=" text-gray-600 mb-8 text-2xl">
                All you have to do is Login or Sıgn up.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2  ">
                <div>
                  <a href="/login">
                    <button className="bg-black text-white px-16 py-3 rounded-full mb-8 w-full lg:w-auto">
                      GO TO LOGIN PAGE
                    </button>
                  </a>
                </div>
                <div>
                  <a href="/signup">
                    <button className="bg-black text-white px-16 py-3 rounded-full mb-8 w-full lg:w-auto">
                      GO TO SIGN UP PAGE
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:container mx-auto overflow-hidden bg-brand-100 relative items-center justify-center py-10">
            <div className=" bg-brand-100 relative">
              <Register />
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="  lg:h-[663px] bg-brand-100 lg:flex  items-center ">
          <div className="container mx-auto px-4 pt-20  ">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-black text-4xl lg:text-6xl  mb-4 mx-auto">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h2>
              <p className=" text-gray-600 mb-8">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <a href="/products">
                <button className="bg-black text-white px-16 py-3 rounded-full mb-8 w-full lg:w-auto">
                  Shop Now
                </button>
              </a>
              <div className="grid  md:flex">
                <div className="grid grid-cols-2  md:flex">
                  <div className="items-center justify-center mx-8 pr-8 md:mx-2  border-r-2 ">
                    <span className="text-4xl font-bold">200+</span>
                    <p className="text-gray-600 w-max">International Brands</p>
                  </div>
                  <div className="relative items-center  right-0 md:pr-8 mx-8 md:border-r-2 ">
                    <span className="text-4xl font-bold">2,000+</span>
                    <p className="text-gray-600 w-max">High-Quality Products</p>
                  </div>
                </div>
                <div className="flex items-center justify-center mx-8 md:pt-0 pt-8 md:mx-2">
                  <div className="justify-center items-center">
                    <span className="text-4xl font-bold">30,000+</span>
                    <p className="text-gray-600 w-max">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:container mx-auto overflow-hidden bg-brand-100 relative">
            <div className=" h-[463px] lg:h-[663px] bg-brand-100 relative">
              <img
                src="https://s3-alpha-sig.figma.com/img/b26f/ea69/ccfd8aa5825862cdb9604a4fb4930464?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TvxVU-Cpe5Zm39lM~C4r7XvuxN88nMh2JlrjEmOIOSiFrfrV9AJcOq8bUEcJZQNuoc2cIuyzBmBo1bCBZXAk4wDX6L6i4zD~tcdeD5gP7SBlWT1594zHL2SyKO01IqeknnASK6ZSxOAHW4rnI78xe9yORlp3gjv3DwklLyDFFHcxBTAWdPzlb3URggSvYOCJu1NXf0tbfu3B9HST1pmoK1Bib9cvfsrFUXAfB5ScaJayzHHu0rz0wEXPbRN6zK7-OzB3-V938vuFOfPjOAAd55ttA4xaphgXMIcFly7sgFHXGm8GUy2Gz1zcQ2YnXofpdnFxZD5bpGNdzClPj6wF8Q__"
                alt="Banner Image"
                className=" max-w-sm  lg:max-w-[630px]   mx-auto object-cover  lg:absolute inset-0"
              />
            </div>
            <BsStars className=" text-6xl md:text-8xl absolute top-1/4 md:right-28 lg:right-0 right-0" />
            <BsStars className="text-4xl md:text-6xl absolute top-1/2 md:left-28 lg:left-0 left-0" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
