import React, { useEffect, useState } from "react";
import StarRating from "../common/StarRating";
import ProductTypes from "../../types/ProductTypes";
import { Link } from "react-router-dom";

interface ProductsProps {
  products: ProductTypes[];
}

const Category: React.FC<ProductsProps> = ({ products }) => {
  const productsPerPage = 12; // Sayfa başına görüntülenecek ürün sayısı
  const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa numarası

  // Geçerli sayfadaki ürünleri hesapla
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
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
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-auto w-full">
      <h1 className="text-5xl font-extrabold text-center py-5">Products</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="h-60 bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-auto">
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
                  <div className="text-black font-semibold flex flex-row lg:items-center gap-4">
                    <h3 className="md:text-2xl">${product.price}</h3>
                  </div>
                </div>
              </Link>
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
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md ${
                  currentPage === i + 1 ? "bg-gray-400" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={nextPage}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
            disabled={
              currentPage === Math.ceil(products.length / productsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
