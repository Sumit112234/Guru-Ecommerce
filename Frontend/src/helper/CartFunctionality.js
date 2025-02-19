import axios from 'axios';


const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
export const addToCartFunc = async({ productId, quantity, userId }) => {
    
    try {
        const response = await axios.post(`${backendUrl}cart/addtocart`, {
          productId,
          quantity,
          userId
        });
        
        //console.log(response);
        // const res = response?.data;

        // //console.log(res, response);
      } catch (error) {
    
        console.error(error);
      }
  };
export const updateCartFunc = async({ productId, quantity, userId }) => {
    
    try {
        const response = await axios.post(`${backendUrl}cart/updatecart`, {
          productId,
          quantity,
          userId
        });
    
        const res = response?.data;

        //console.log(res);
      } catch (error) {
    
        console.error(error);
      }
  };
export const removeFromCartFunc = async({ productId, quantity, userId }) => {
    
    try {
        const response = await axios.post(`${backendUrl}cart/removefromcart`, {
          productId,
          quantity,
          userId
        });
    
        const res = response?.data;

        //console.log(res);
      } catch (error) {
    
        console.error(error);
      }
  };
 
export const getCartFunc = async(userId) => {
    
    try {
        const response = await axios.get(`${backendUrl}cart/getCart?userId=${userId}`);
    
        const res = response?.data;

        //console.log(res);
        return res;
      } catch (error) {
    
        console.error(error);
        return [];
      }
  };