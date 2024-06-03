import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updatedProduct: any) => {
  try {
    const response = await api.put(`/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
