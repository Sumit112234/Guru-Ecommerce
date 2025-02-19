import axios from './axios';

export const getUserDetails = async (id) => {
    try {
      const response = await axios.get(`/user/getUserDetail/${id}`, {
        withCredentials: true,
      });
      return response;
    } catch {
      return false; 
    }
  };