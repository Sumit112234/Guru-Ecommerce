import axios from "axios";

let backendUrl = import.meta.env.VITE_APP_SERVER_URL;

export async function updateUser(data){

    try {
        
        let res = await axios.put(backendUrl + 'user/update-details', data,{
            withCredentials : true,
        })

        if(res)
            return 'User updated successfully!';
        else    
          return 'User Not Updated';
    } catch (error) {
        return 'unable to update user!';
    }
}