import axios from './axios';

export const verifyToken = async (token) => {
    try {
      const response = await axios.get('/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.valid;
    } catch {
      return false; 
    }
  };