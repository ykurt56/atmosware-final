import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
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
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.get(
      `/users?email=${email}&password=${password}`
    );
    const user = response.data[0];
    if (user) {
      return user;
    } else {
      throw new Error("Kullanıcı bulunamadı veya şifre yanlış.");
    }
  } catch (error) {
    throw new Error("Giriş yapılırken bir hata oluştu.");
  }
};
