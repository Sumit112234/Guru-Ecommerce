import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      //console.log("State items (raw):", state.items);
      //console.log("State items (plain object):", JSON.parse(JSON.stringify(state.items)));
            //console.log("First item:", state.items[0]);
      //console.log("First item productId ID:", state.items[0]?.productId?._id);
      //console.log("Payload ID:", action.payload._id);
    
      const existingItem = state.items.find(
        (item) => item.productId._id === action.payload._id // Use productId._id here
      );
    
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({
          productId: action.payload, // Use productId for consistency
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    
    removeFromCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.productId._id === action.payload.productId
      );
    
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.totalPrice;
        state.items.splice(itemIndex, 1);
      }
    },
    
    updateQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.productId._id === action.payload.productId
      );
    
      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.amount;
    
        if (newQuantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId._id !== action.payload.productId
          );
          state.totalQuantity -= existingItem.quantity;
          state.totalPrice -= existingItem.totalPrice;
        } else {
          existingItem.quantity = newQuantity;
          existingItem.totalPrice =
            existingItem.quantity * existingItem.productId.price;
    
          state.totalQuantity += action.payload.amount;
          state.totalPrice += action.payload.amount * existingItem.productId.price;
        }
      }
    },
    
    setCartState(state, action) {
      state.items = action.payload ? action.payload : [];
    
      if (state?.items?.length > 0) {
        state.totalQuantity = action.payload.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalPrice = action.payload.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );
      } else {
        state.totalQuantity = 0;
        state.totalPrice = 0;
      }
    },
    
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    
  },
});

export const { addtoCart, removeFromCart, updateQuantity, clearCart ,setCartState} = cartSlice.actions;

export default cartSlice.reducer;


// const initialState = {
//   items: [], // Array of cart items
//   totalQuantity: 0, // Total items across all products
//   totalPrice: 0, // Total cart price
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addtoCart(state, action) {
//       const existingItem = state.items.find(
//         (item) => item.productId._id === action.payload._id
//       );
//       //console.log(state.items , existingItem);

//       if (existingItem) {
//         existingItem.quantity += 1;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({
//           product: action.payload,
//           quantity: 1,
//           totalPrice: action.payload.price,
//         });
//       }

//       state.totalQuantity += 1;
//       state.totalPrice += action.payload.price;
//     },

//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex(
//         (item) => item.productId._id === action.payload._id
//       );

//       if (itemIndex !== -1) {
//         const item = state.items[itemIndex];
//         state.totalQuantity -= item.quantity;
//         state.totalPrice -= item.totalPrice;
//         state.items.splice(itemIndex, 1);
//       }
//     },

//     clearCart(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },

//     setCartState(state, action) {
//       // //console.log(action.payload)
//       state.items = action.payload ? action.payload : [];

//       if(state?.items?.length > 0)
//       {

//         state.totalQuantity = action.payload.reduce(
//           (acc, item) => acc + item.quantity,
//           0
//         );
//         state.totalPrice = action.payload.reduce(
//           (acc, item) => acc + item.totalPrice,
//           0
//         );
//       }
//       else{
//         state.totalQuantity = 0;
//         state.totalPrice = 0;
//       }
//     },

//     updateQuantity(state, action) {
//       const existingItem = state.items.find(
//         (item) => item.productId._id === action.payload.productId
//       );
//       //console.log(action.payload);

//       if (existingItem) {
//         const newQuantity = existingItem.quantity + action.payload.amount;

//         if (newQuantity <= 0) {
//           state.items = state.items.filter(
//             (item) => item.productId._id !== action.payload.productId
//           );
//           state.totalQuantity -= existingItem.quantity;
//           state.totalPrice -= existingItem.totalPrice;
//         } else {
//           existingItem.quantity = newQuantity;
//           existingItem.totalPrice =
//             existingItem.quantity * existingItem.product.price;

//           state.totalQuantity += action.payload.amount;
//           state.totalPrice +=
//             action.payload.amount * existingItem.product.price;
//         }
//       }
//     },
//   },
// });

// export const {
//   addtoCart,
//   removeFromCart,
//   clearCart,
//   updateQuantity,
//   setCartState,
// } = cartSlice.actions;
// export default cartSlice.reducer;
