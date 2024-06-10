import axios from "axios";
import RegisterFormValues from "../types/User";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUser = async (userData: RegisterFormValues) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.get(`users/?email=${email}`);
    const user = response.data[0];
    if (user.password == password) {
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
