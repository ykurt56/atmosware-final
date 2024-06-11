import React, { useState, useEffect } from "react";
import { VscSettings } from "react-icons/vsc";
import { useParams } from "react-router-dom";
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectPrice = (minPrice: number, maxPrice: number) => {
    const sortedProducts = products
      .filter((product) => !category || product.category === category)
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    setFilteredProducts(sortedProducts);
  };

  const handleSortPrice = (order: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else if (order === "desc") {
        return b.price - a.price;
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleSortAz = (order: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else if (order === "desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleCategorySelect = (category: string) => {
    window.location.href = `/category/${category}`;
  };

  useEffect(() => {
    let newFilteredProducts = products;

    if (category) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (selectedColor) {
      if (!newFilteredProducts) {
        newFilteredProducts = products;
      }
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.color === selectedColor
      );
    }

    setFilteredProducts(newFilteredProducts);
  }, [category, selectedColor, products]);

  return (
    <div className="container mx-auto flex justify-center">
      <div className="p-4 border rounded-lg container w-1/3 h-full mb-36 hidden lg:block">
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
          <div className="flex flex-col ">
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
            <ColorButtons
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
        )}
      </div>
      <div className="container mx-5">
        <div className="grid grid-cols-2  items-center mb-4 gap-20 lg:hidden">
          <div className="container mx-auto">
            <Price onSelectPrice={handleSelectPrice} />
          </div>
          <div className=" container mx-auto">
            <h3 className="text-xl font-bold mb-4">Category</h3>
            <div className="flex">
              <button
                className="text-xl font-semibold text-black"
                onClick={() => handleCategorySelect("")}
              >
                All Products
              </button>
            </div>
            <div className="flex">
              <button
                className="text-xl font-semibold text-black"
                onClick={() => handleCategorySelect("men's clothing")}
              >
                Men's
              </button>
            </div>
            <div className="flex">
              <button
                className="text-xl font-semibold text-black"
                onClick={() => handleCategorySelect("women's clothing")}
              >
                Women's
              </button>
            </div>
            <div className="flex">
              <button
                className="text-xl w-max font-semibold text-black"
                onClick={() => handleCategorySelect("jewelery")}
              >
                Jewelery
              </button>
            </div>
          </div>
        </div>

        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Filters;
