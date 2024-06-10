import { useState } from "react";
import { Link } from "react-router-dom";
import ProductTypes from "../../types/ProductTypes";

const SearchResultsList = ({
  searchResults,
}: {
  searchResults: ProductTypes[];
}) => {
  const [reset, setReset] = useState<boolean>(true);
  const searchReset = () => {
    setReset(false);
  };

  return (
    <div>
      {reset && (
        <div className="mt-2">
          <div className="bg-white shadow-md rounded p-4">
            <div className="flex flex-col">
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-100 rounded-lg p-4"
                      onClick={searchReset}
                    >
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-auto rounded"
                        />
                      </Link>
                      <div className="mt-2">
                        <Link to={`/products/${product.id}`}>
                          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                            {product.title}
                          </h1>
                        </Link>
                        <p className="text-green-500 font-black">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No search results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsList;
