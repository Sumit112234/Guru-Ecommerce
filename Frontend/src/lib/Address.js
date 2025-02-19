import axios from './axios';
export const addAddress = async (data) => {
    try {
      const response = await axios.post('/user/addAddress',data,{
        withCredentials : true,
      });
      return response;
    } catch {
      return false; 
    }
  };
export const getAddress = async () => {
    try {
      const response = await axios.get('/user/getAddress',{
        withCredentials : true,
      });
      return response.data.addresses ? response.data.addresses : [];
    } catch {
      return false; 
    }
  };