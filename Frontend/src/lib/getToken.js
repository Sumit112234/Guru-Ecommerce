import axios from './axios';

export async function getToken(){
     try {
        let data = await fetch(`${backendUrl}user/getToken`);
        let res = await data.json();
        console.log(res);
        return res;
     } catch (error) {
        console.log('token not availble.', error);
        return null;
     }
}

export async function getUserByToken(){
   return null;
}
