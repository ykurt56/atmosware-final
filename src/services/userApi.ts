import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

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

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
