import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const OrderApi = async (buyItemData: any) => {
  try {
    const response = await api.post("/Order", buyItemData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/Order");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
