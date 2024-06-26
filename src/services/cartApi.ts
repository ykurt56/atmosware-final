import axios from "axios";
import ProductTypes from "../types/ProductTypes";
import CartItemTypes from "../types/CartItem";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getCartItem = async (user_id: string) => {
  if (!user_id) {
  } else {
    try {
      const response = await api.get(`/cart?user_id=${user_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }
};

export const addToCart = async (
  product: ProductTypes,
  quantity: number,
  user_id: string,
  selectedSize: string
) => {
  try {
    const cartItem = {
      user_id,
      id: `${product.id}-${selectedSize}`,
      name: product.title,
      size: selectedSize,
      price: product.price,
      image: product.image,
      quantity,
    };

    const response = await api.post("/cart", cartItem);

    if (response.status === 201) {
    } else {
      throw new Error("Failed to add product to cart");
    }
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const updateCartItemQuantity = async (
  id: string,
  newQuantity: number,
  itemData: CartItemTypes
) => {
  try {
    const updatedItem = {
      ...itemData,
      quantity: newQuantity,
    };

    const response = await api.put(`/cart/${id}`, updatedItem);

    if (response.status === 200) {
    } else {
      throw new Error("Failed to update cart item quantity");
    }
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
};
