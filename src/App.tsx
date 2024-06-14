import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { getProducts } from "./services/productApi";
import ProductTypes from "./types/ProductTypes";
import NewProduct from "./components/home/NewProduct";
import Filters from "./components/products/Filters";
import Admin from "./admin/pages/admin";
import AddProducts from "./admin/pages/AddProducts";
import Users from "./admin/pages/Users";
import Orders from "./admin/pages/Orders";

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [isLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {isLoggedIn && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products/:id"
              element={<ProductDetailPage products={products} />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/new-arrivals" element={<NewProduct />} />
            <Route path="/category/:category?" Component={Filters} />
          </Routes>
        )}
        {!isLoggedIn && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )}

        {isAdmin && (
          <Routes>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/addproducts" element={<AddProducts />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="admin/orders" element={<Orders />} />
          </Routes>
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
