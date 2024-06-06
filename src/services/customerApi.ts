import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers");
    throw error;
  }
};
