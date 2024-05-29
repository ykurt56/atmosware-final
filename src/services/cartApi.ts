import axios from "axios";

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
      throw error; // Hata durumunda hatayı yeniden fırlat
    }
  }
};

export const addToCart = async (
  product: any,
  quantity: number,
  user_id: string
) => {
  try {
    // ID'yi string olarak dönüştür
    const cartItem = {
      user_id,
      id: product.id.toString(),
      name: product.title,
      size: product.size,
      color: product.color,
      price: product.price,
      image: product.image,
      quantity,
    };

    const response = await api.post("/cart", cartItem);

    if (response.status === 201) {
      // Başarılı durumda bir işlem yapılabilir
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
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
};

export const updateCartItemQuantity = async (
  id: string,
  newQuantity: number,
  itemData: any // Öğe verileri
) => {
  try {
    const updatedItem = {
      ...itemData, // Mevcut öğe verileri
      quantity: newQuantity, // Yeni miktar
    };

    const response = await api.put(`/cart/${id}`, updatedItem);

    if (response.status === 200) {
      // Başarılı durumda bir işlem yapılabilir
    } else {
      throw new Error("Failed to update cart item quantity");
    }
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
};
