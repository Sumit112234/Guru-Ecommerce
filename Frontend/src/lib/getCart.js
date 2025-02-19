// import axios from './axios';
import axios from "axios";

export const getCart = async () => {
    try {
      const response = await axios.get('/user/getCart');
      return response;
    } catch {
      return false; 
    }
  };