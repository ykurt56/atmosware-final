import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductTypes from "../types/ProductTypes";
import StarRating from "../components/common/StarRating";
import DetailFooterbar from "../components/ProductDetail/DetailFooterbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToCart,
  getCartItem,
  updateCartItemQuantity,
} from "../services/cartApi";
import RandomProducts from "../components/ProductDetail/RandomProducts";
interface ProductDetailProps {
  products: ProductTypes[];
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Seçilen boyutu tutacak state

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (vote: string) => {
    if (!selectedSize) {
      return toast.error("Please select a size");
    }
    setQuantity((prevQuantity) => {
      if (vote === "increment") {
        if (
          prevQuantity <
          product.sizes[selectedSize as keyof typeof product.sizes]
        ) {
          return prevQuantity + 1;
        }
      } else if (vote === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };
  const handleAddToCart = async () => {
    const user_id: string = localStorage.getItem("User_ID") || ""; // Varsayılan değer atama
    console.log(user_id);
    try {
      const cartItems = await getCartItem(user_id);
      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id == product.id && item.size == selectedSize // Eşleşen ürünleri kontrol et
      );

      if (
        selectedSize === null ||
        product.sizes[selectedSize as keyof typeof product.sizes] == 0
      ) {
        toast.error(
          selectedSize === null
            ? "Please select a size"
            : "Product out of stock"
        );
        return;
      }
      if (
        quantity > product.sizes[selectedSize as keyof typeof product.sizes]
      ) {
        toast.error("Quantity cannot be greater than stock");
        return;
      }

      if (existingItemIndex === -1) {
        const user_id: string = localStorage.getItem("User_ID") || ""; // Varsayılan değer atama
        await addToCart(product, quantity, user_id, selectedSize);
        console.log(user_id);

        toast.success("Product added to cart successfully!");
      } else {
        const existingItem = cartItems[existingItemIndex];
        const updatedQuantity = existingItem.quantity + quantity;
        await updateCartItemQuantity(
          existingItem.id,
          updatedQuantity,
          existingItem
        ); // Güncellenmiş öğe verilerini gönder
        toast.success("Product quantity updated in cart successfully!");
      }
    } catch (error) {
      toast.error("Failed to add/update product in cart");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  const handleSizeSelection = (size: any) => {
    setSelectedSize(size);
  };

  const checkStock = (value: any) => {
    if (value <= 0) {
      return (
        <div>
          <span className="text-red-500">Ürün Stockta Kalmamıştır.</span>
        </div>
      );
    }
    if (value < 4) {
      return (
        <div>
          <p>Son 3 Ürün</p>
        </div>
      );
    } else {
      return (
        <div>
          <span>{value} adet Stokta kaldı</span>
        </div>
      );
    }
  };
  return (
    <div className="bg-white">
      <ToastContainer />
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className=" mx-10">
          <div className="p-10">
            <img
              src={product.image}
              alt="Product main"
              className="w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto "
            />
          </div>
        </div>

        <div className=" mx-10">
          <h1 className="text-4xl font-black">{product.title}</h1>
          <div className="flex items-center my-4">
            <StarRating rate={product.rating.rate} />
            <span className="ml-2 text-gray-500">{product.rating.rate}</span>
            <span className="ml-2 text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <div className="my-4 pb-3 border-b-2">
            <span className="text-2xl font-semibold text-red-600">
              ${product.price}
            </span>
            <span className="ml-2 text-xl text-green-600"></span>
          </div>
          <p className="text-gray-700 my-4 border-b-2 pb-2">
            {product.description}
          </p>

          <div className="my-4 pb-3 border-b-2">
            <label className="block text-gray-700">Choose Size</label>
            <div className="flex space-x-2">
              {product.sizes &&
                Object.entries(product.sizes).map(([size, value], index) => (
                  <div>
                    <button
                      key={index}
                      className={`py-2 px-2 border ${
                        size === selectedSize
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleSizeSelection(size)}
                    >
                      {size} <p className="text-xs "> {checkStock(value)}</p>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="my-4 flex items-center">
            <button
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-l-full"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span className="py-2 px-4 bg-gray-200 text-gray-700">
              {quantity}
            </span>
            <button
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-r-full"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
            <button
              className="ml-4 py-2 px-4 bg-black text-white w-full rounded-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <DetailFooterbar product={product} />
      <RandomProducts />
    </div>
  );
};

export default ProductDetailPage;
