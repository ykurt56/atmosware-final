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
import { getProducts } from "./services/api"; // api dosyanızdan getProducts fonksiyonunu import edin
import ProductTypes from "./types/ProductTypes";
import NewProduct from "./components/home/NewProduct";

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    // Ürünleri API'den al
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
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Ürünlerin bulunduğu products dizisini ProductDetailPage bileşenine iletiyoruz */}
          <Route
            path="/products/:id"
            element={<ProductDetailPage products={products} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new-arrivals" element={<NewProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
