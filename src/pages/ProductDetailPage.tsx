import React from "react";
import { useParams } from "react-router-dom";
import ProductTypes from "../types/ProductTypes";
import StarRating from "../components/common/StarRating";

interface ProductDetailProps {
  products: ProductTypes[]; // products prop'unu tanımlayın
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id?: string }>(); // URL'den ürün ID'sini al

  // ID'nin tanımlı olup olmadığını kontrol et
  if (!id) {
    return <div>No product ID specified</div>;
  }

  // ID'ye göre ürünü bul
  const product = products.find((product) => product.id === parseInt(id, 10)); // parseInt fonksiyonuna ikinci bir argüman olarak taban ekleyin

  // Ürün bulunamazsa
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-2  gap-10">
        <div className="flex" key={product.id}>
          <div className="flex flex-col max-w-60">
            <div className="h-60  bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-auto">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover mb-4   h-full"
              />
            </div>

            <div className="h-60  bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-auto">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover mb-4   h-full"
              />
            </div>

            <div className="h-60  bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-auto">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover mb-4   h-full"
              />
            </div>
          </div>
          <div className="w-1/2 h-96">
            <div className="h-60   bg-brand-100 rounded-lg shadow-lg p-4 mb-8 md:h-3/4 flex justify-center items-center mx-5">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover mb-4   h-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="md:text-xl font-bold mb-2 line-clamp-1">
            {product.title}
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rate={product.rating.rate} />
            <p className="">{product.rating.rate}</p>
            <p className=" hidden md:block text-gray-600">
              {product.rating.count} reviews
            </p>
          </div>
          <div className="  text-black font-semibold flex  flex-row  lg:items-center gap-4">
            <h3 className=" md:text-2xl">${product.price}</h3>
            {product.price >= 50 && 5 <= product.price && (
              <div className="block md:flex gap-2 md:text-xl lg:text-2xl">
                <p className="text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
