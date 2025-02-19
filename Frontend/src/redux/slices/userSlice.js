import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user : null,
//   user: {
//     address_details
// : 
// [],
// avatar
// : 
// "",
// createdAt
// : 
// "2025-01-11T16:16:14.125Z",
// email
// : 
// "sumit22@gmail.com",last_login_date
// : 
// null,
// mobile
// : 
// 0,
// name
// : 
// "sumit",
// orderHistory
// : 
// [],
// password
// : 
// "$2a$13$DIf6RH1UfyStSS0SmjDN4u3KPKUH4C0BQk6NRJENWVOYRrg8TkHUa",
// refresh_token
// : 
// "",
// role
// : 
// "User",
// status
// : 
// "Active",
// updatedAt
// : 
// "2025-01-11T16:16:14.125Z",
// verify_email
// : 
// false,
// _id: "6782994e47777c14c718edd1"
//   },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  admin : false
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    changeUserToAdmin: (state) => {
      state.admin = true;
    },
  },
});

export const { addUser, changeUserToAdmin, removeUser } = userSlice.actions;

export default userSlice.reducer;
