import React, { useState, useEffect } from "react";
import { VscSettings } from "react-icons/vsc";
import { useParams, useNavigate } from "react-router-dom";
import ColorButtons from "./ColorButtons";
import Products from "./Products";
import { getProducts } from "../../services/productApi";
import ProductTypes from "../../types/ProductTypes";
import Sort from "./Sort";
import Size from "./Size";
import Price from "./Price";

const Filters: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts); // İlk başta tüm ürünleri filtreli ürünlere eşitle
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectPrice = (minPrice: number, maxPrice: number) => {
    const sortedProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(sortedProducts); // Filtrelenmiş ürünleri güncelle
  };

  const handleSortPrice = (order: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price; // Artan sıralama
      } else if (order === "desc") {
        return b.price - a.price; // Azalan sıralama
      }
      return 0;
    });
    setFilteredProducts(sortedProducts); // Filtrelenmiş ürünleri güncelle
  };

  const handleSortAz = (order: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title); // Artan sıralama
      } else if (order === "desc") {
        return b.title.localeCompare(a.title); // Azalan sıralama
      }
      return 0;
    });
    setFilteredProducts(sortedProducts); // Filtrelenmiş ürünleri güncelle
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/category/${category}`);
  };

  useEffect(() => {
    const newFilteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;
    setFilteredProducts(newFilteredProducts);
  }, [category, products]);

  return (
    <div className="container mx-auto flex justify-center">
      <div className="p-4 border rounded-lg container w-1/3 h-full mb-36">
        <div className="flex items-center justify-between  mb-4 border-b-2">
          <h3 className="text-xl font-bold mb-4 ">Filters</h3>

          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle Filters Menu"
            className="focus:outline-none"
          >
            <VscSettings className="text-2xl" />
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-col">
            <div className="flex flex-col border-b-2 mb-4">
              <div className="mb-4 container mx-auto">
                <h3 className="text-xl font-bold mb-4">Category</h3>
                <div className="flex">
                  <button
                    className="text-sm md:text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("")}
                  >
                    All Products
                  </button>
                </div>
                <div className="flex">
                  <button
                    className="text-sm md:text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("men's clothing")}
                  >
                    Men's
                  </button>
                </div>
                <div className="flex">
                  <button
                    className="text-sm md:text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("women's clothing")}
                  >
                    Women's
                  </button>
                </div>
                <div className="flex">
                  <button
                    className="text-sm md:text-xl w-max font-semibold text-black"
                    onClick={() => handleCategorySelect("jewelery")}
                  >
                    Jewelery
                  </button>
                </div>
              </div>
            </div>
            <Price onSelectPrice={handleSelectPrice} />
            <Sort onSortPrice={handleSortPrice} onSortAZ={handleSortAz} />
            <Size />
            <ColorButtons />
          </div>
        )}
      </div>
      <div className="container mx-5">
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Filters;
