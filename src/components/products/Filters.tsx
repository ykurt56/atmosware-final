import React, { useState, useEffect } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { Formik, Form } from "formik";
import ColorButtons from "./ColorButtons";
import Products from "./Category"; // Products bileşenini ekledik
import { getProducts } from "../../services/api";

interface FiltersProps {}

interface PriceValues {
  price: number;
}

const Filters: React.FC<FiltersProps> = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [category, setCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="container mx-auto flex">
      <div className="p-4 border rounded-lg container w-72 mb-36 ">
        <div className="flex items-center justify-between mb-4 border-b-2">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
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
                <div className="flex justify-center">
                  <button
                    className="text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("")}
                  >
                    All Products
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("men's clothing")}
                  >
                    Men's Category
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("women's clothing")}
                  >
                    Women's Category
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-xl font-semibold text-black"
                    onClick={() => handleCategorySelect("jewelery")}
                  >
                    Jewelry Category
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col  border-b-2 mb-4">
              <div className="mb-4 container mx-auto">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold mb-4">Price</h3>
                  <MdOutlineChevronRight />
                </div>
                <Formik
                  initialValues={{ price: 5 }}
                  onSubmit={(values: PriceValues) => {
                    console.log(values);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="flex justify-between items-center">
                        <input
                          type="range"
                          min={5}
                          max={500}
                          value={values.price}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue("price", parseInt(e.target.value));
                          }}
                          className="w-full"
                        />
                        <span>${values.price}</span>
                      </div>
                      <button type="submit" className="hidden">
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-4 container mx-auto">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold mb-4">Size</h3>
                  <MdOutlineChevronRight />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button className="px-8 py-2 text-sm  rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      XX-Small
                    </button>
                    <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      X-Small
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      Small
                    </button>
                    <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      Medium
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      Large
                    </button>
                    <button className="px-8 py-2 text-sm rounded-full bg-gray-300 focus:bg-black focus:text-white">
                      X-Large
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ColorButtons />

            <div className="flex justify-center">
              <button className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 w-full">
                Apply Filters
              </button>
            </div>
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
