// http://localhost:8759/api/admin/getorders
import axios from './axios';

export const getOrders = async () => {
    try {
      const response = await axios.get('/admin/getorders', {
        withCredentials: true,
      });
      return response;
    } catch(e) {
        console.log(e)
      return false; 
    }
  };