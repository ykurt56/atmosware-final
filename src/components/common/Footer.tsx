import React from "react";
import { BiLogoMastercard } from "react-icons/bi";
import {
  FaAmazonPay,
  FaApplePay,
  FaFacebookF,
  FaGithub,
  FaGooglePay,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { RiMailCheckLine, RiVisaLine } from "react-icons/ri";
import { useFormik } from "formik";

const Footer: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <footer className=" w-full bg-gray-100 ">
      <div className="bg-black relative bottom-24 container mt-20 mx-auto  grid col-span-2 text-white p-10 rounded-lg  lg:mx-auto lg:left-0 lg:right-0 lg:grid-cols-2 lg:text-center">
        <div className="lg:text-left mb-4">
          <h2 className="text-[40px] font-extrabold mb-2">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="lg:text-right flex flex-col items-end gap-4 justify-center"
        >
          <div className="relative md:w-auto w-full">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="p-4 pl-12 rounded-full text-black sm:mb-0 w-full lg:w-[349px]"
            />
            <RiMailCheckLine className="absolute text-xl top-1/2 left-4 transform -translate-y-1/2 text-black" />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-4 rounded-full w-full lg:w-[349px]"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
      <div className="relative bottom-16 ">
        <div className=" container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 ">
            <div className="col-span-2 ">
              <div className="max-w-xs mx-auto  ">
                <h2 className="text-5xl font-extrabold mb-4">L O G O</h2>
                <p className="text-gray-600 mb-4">
                  We have clothes that suits your style and which you're proud
                  to wear. From women to men.
                </p>
              </div>

              <div className="flex space-x-4 text-xl   justify-center">
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-black hover:text-white"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-black hover:text-white"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-black hover:text-white"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-black hover:text-white"
                >
                  <FaGithub />
                </a>
              </div>
            </div>

            <div className="font-light   ">
              <h3 className="text-xl font-semibold mb-4 tracking-widest ">
                COMPANY
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Career
                  </a>
                </li>
              </ul>
            </div>

            <div className="font-light ">
              <h3 className="text-xl font-semibold mb-4 tracking-widest">
                HELP
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="font-light ">
              <h3 className="text-xl font-semibold mb-4 tracking-widest">
                FAQ
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            <div className="font-light ">
              <h3 className="text-xl font-semibold mb-4 tracking-widest">
                RESOURCES
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600">
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <p className="text-gray-600 text-center sm:text-left">
              L O G O &copy; 2023 - 2024, All rights reserved.
            </p>
            <div className="flex justify-center sm:justify-end text-4xl space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="px-2 rounded-lg border bg-white text-blue-700"
              >
                <RiVisaLine />
              </a>
              <a
                href="#"
                className="px-2 rounded-lg border bg-white text-orange-400"
              >
                <BiLogoMastercard />
              </a>
              <a href="#" className="px-2 rounded-lg border bg-white ">
                <FaAmazonPay />
              </a>
              <a href="#" className="px-2 rounded-lg border bg-white">
                <FaApplePay />
              </a>
              <a href="#" className="px-2 rounded-lg border bg-white">
                <FaGooglePay />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
