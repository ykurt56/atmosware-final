import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
};
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
