import axios from "./axios";

export const getUserOrders = async (id) => {
    try {
      const response = await axios.get(`/product/get-orders/${id}`,{
        withCredentials : true,
      });
      return response;
    } catch {
      return false; 
    }
  };