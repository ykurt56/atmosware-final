import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-black container grid col-span-2 text-white p-10 rounded-lg mx-4 lg:mx-auto lg:left-0 lg:right-0 lg:grid-cols-2 lg:text-center">
        <div className="lg:text-left mb-4">
          <h2 className="text-[40px] font-extrabold mb-2">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>
        <div className="lg:text-right flex flex-col items-end gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-4 rounded-full text-black sm:mb-0 w-[349px]"
          />
          <button className="bg-white text-black px-6 py-4 rounded-full w-[349px]">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
      <footer className=" relative bottom-28 py-28  w-full bg-gray-100 -z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SHOP.CO</h3>
              <p className="text-gray-600 mb-4">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-500">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-500">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-500">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">COMPANY</h3>
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

            <div>
              <h3 className="text-xl font-bold mb-4">HELP</h3>
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

            <div>
              <h3 className="text-xl font-bold mb-4">FAQ</h3>
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

            <div>
              <h3 className="text-xl font-bold mb-4">RESOURCES</h3>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600">
              &copy; 2024 SHOP.CO. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-600">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
