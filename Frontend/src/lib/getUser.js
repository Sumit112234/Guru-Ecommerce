import axios from './axios';

export const getUser = async () => {
    try {
      const response = await axios.get('/user/getUser', {
        withCredentials: true,
      });
      return response;
    } catch {
      return false; 
    }
  };