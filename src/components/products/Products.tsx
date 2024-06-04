import React, { useEffect, useState } from "react";
import StarRating from "../common/StarRating";
import ProductTypes from "../../types/ProductTypes";
import { Formik, Form, Field } from "formik";

interface ProductsProps {
  products: ProductTypes[];
}

const Category: React.FC<ProductsProps> = ({ products }) => {
  const productsPerPage = 12; // Sayfa başına görüntülenecek ürün sayısı
  const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa numarası
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi

  // Geçerli sayfadaki ürünleri hesapla
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalFilteredProducts = filteredProducts.length;
  const totalFilteredPages = Math.ceil(totalFilteredProducts / productsPerPage);
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Sayfa değiştirmek için işlev
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Sayfa değiştiğinde sayfanın başına at
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Önceki sayfa
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sonraki sayfa
  const nextPage = () => {
    if (currentPage < totalFilteredPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-auto w-full">
      <h1 className="text-5xl font-extrabold text-center py-5">Products</h1>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          setSearchTerm(values.search);
          setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <Field
              className="w-full border border-gray-400 rounded-md p-2 mb-5"
              type="text"
              name="searchs"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Arama yapılırken ilk sayfaya dön
              }}
            />
          </Form>
        )}
      </Formik>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts.map((product, index) => (
            <div key={`${product.id}-${index}`}>
              <a href={`/products/${product.id}`}>
                <div className="h-60 bg-brand-100 rounded-lg shadow-lg p-4 mt-4 md:h-3/4 flex justify-center items-center mx-auto">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover mb-4 rounded-full h-full"
                  />
                </div>
                <div>
                  <h2 className="md:text-xl font-bold mb-2 line-clamp-1">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <StarRating rate={product.rating.rate} />
                    <p>{product.rating.rate}</p>
                    <p className="hidden md:block text-gray-600">
                      {product.rating.count} reviews
                    </p>
                  </div>
                  <div className="text-black font-semibold flex flex-row lg:items-center gap-4 mb-8">
                    <h3 className="md:text-2xl">${product.price}</h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        {/* Sayfalama düğmeleri */}
        <div className="flex justify-center mt-5">
          <button
            onClick={prevPage}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalFilteredPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md ${
                currentPage === i + 1 ? "bg-gray-400" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
            disabled={currentPage === totalFilteredPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
