import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  removeFromCart,
  updateQuantity,
  setCartState,
} from "../redux/slices/cartSlice";
import {
  getCartFunc,
  addToCartFunc,
  updateCartFunc,
  removeFromCartFunc,
} from "../helper/CartFunctionality";
import { useUser } from "../context/userContext";

const ShoppingCart = ({ toggleMenuIcon, setToggleMenuIcon }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  //console.log("user from shopping cart : ", user);
  const userId = user ? user._id : "";
  const { darkTheme } = useUser();
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userId !== "") {
          const cartData = await getCartFunc(userId);
          //console.log("cartData from shopping cart : ", cartData);
          
            dispatch(setCartState(cartData.cart));
            setCartItems(cartData.cart);
          
        }
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };

    fetchCartItems();
  }, [ userId]);


  useEffect(() => {
    setCartItems(items);
    console.log('dispatch');
    console.log(items)
    const subtotal = items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  
    // Calculate Total Discount
    const totalDisc = items.reduce(
      (total, item) =>
        total + item.productId.price * item.quantity * (item.productId.discount / 100),
      0
    );
  
    setDiscount(Math.floor(totalDisc)); // Store total discount in state
  
    // Final Total Price after Discount
    const finalTotal = subtotal - totalDisc + 100; // Assuming 100 is the shipping charge
  
    setTotalPrice(Math.floor(finalTotal)); 
  }, [items]);

  const handleRemoveItem = async (productId) => {
    try {
    
      dispatch(removeFromCart({ _id: productId }));
      await removeFromCartFunc({ productId, userId });
      // setCartItems(items)

    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  const handleQuantityChange = async (productId, qty) => {
    try {

      const item = items.find((i) => i.productId._id === productId);
      if (item) {

        const newQuantity = item.quantity + qty;
        // console.log(newQuantity)
        if (newQuantity <= 0) {
          await handleRemoveItem(productId);
          // dispatch(removeFromCart({ _id: productId }));
          // await removeFromCartFunc({ productId, userId });
        } else {
          dispatch(updateQuantity({ productId, amount: qty }));
          await updateCartFunc({
            productId,
            quantity: qty,
            userId,
          });
          // console.log(cartItems.map((item) => {
          //   if (item.productId._id === productId) {
          //     console.log(item.productId.quantity ,qty)
          //     return {
          //       ...item, // Copy existing properties
          //       productId: {
          //         ...item.productId, // Copy existing productId properties
          //         quantity: item.productId.quantity + qty, // Update quantity
          //       },
          //     };
          //   } else {
          //     return item; // Return the original item if no match
          //   }
          // }));
          
          
          
        }
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
    } else {
      alert("Invalid promo code!");
    }
  };

  const calculateTotal = () => {


    const subtotal = items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    
  
    const shipping = 100.0;
    const tax = 0.00;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + shipping + tax - discountAmount;
  };

  const toggleMenu = () => {
    setToggleMenuIcon((prev) => (prev === "menu" ? "close" : "menu"));
  };

  

  return (
    <div
    className={`${
      toggleMenuIcon === "close" ? "translate-x-0  shadow-lg shadow-black" : "translate-x-full hidden sm:block"
    } font-sans w-screen sm:w-fit sm:max-w-96  z-50 fixed sm:top-0 sm:right-0 ${
      darkTheme ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
    } transition-transform duration-500 ease-in-out overflow-x-hidden`}
  >
    <div className="gap-4">
      <div className={`md:col-span-2 ${darkTheme ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-md`}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={toggleMenu} className="font-bold material-symbols-outlined">
            close
          </button>
        </div>
        <hr className={`${darkTheme ? "border-gray-600" : "border-gray-300"} mt-4 mb-8`} />
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div
              className={`w-full sm:h-52 flex flex-col justify-center items-center font-bold text-2xl ${
                darkTheme ? "text-pink-300" : "text-pink-500"
              }`}
            >
              <span>No Items Found!</span>
              <span>Please add some items</span>
            </div>
          ) : (
            <div className="h-96 sm:h-72  overflow-y-scroll flex flex-col gap-4">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.productId._id}
                    className="grid grid-cols-3 items-center gap-4"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <div
                        className={`w-24 h-24 shrink-0 p-2 rounded-md ${
                          darkTheme ? "bg-gray-600" : "bg-white"
                        }`}
                      >
                       
                        <img
                          src={item.productId.images[0] }
                          className="w-full h-full object-contain"
                          alt={item.productId.name}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold">
                           {item.productId.name}
                        </h3>
                        <h6
                          className={`text-xs cursor-pointer mt-0.5 ${
                            darkTheme ? "text-red-400" : "text-red-500"
                          }`}
                          onClick={() => handleRemoveItem(item.productId._id)}
                        >
                          Remove
                        </h6>
                        <div className="flex gap-4 mt-4">
                          <div className="flex space-x-3 items-center">
                            <button
                              className={`px-2.5 py-1 border rounded-md ${
                                darkTheme ? "border-gray-500 text-white" : "border-gray-300"
                              }`}
                              onClick={() => handleQuantityChange(item.productId._id, -1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className={`px-2.5 py-1 border rounded-md ${
                                darkTheme ? "border-gray-500 text-white" : "border-gray-300"
                              }`}
                              onClick={() => handleQuantityChange(item.productId._id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <h4>₹{Math.floor(item.productId.price - ((item.productId.price*(item.productId.discount))/100)) * item.quantity}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
  
      {cartItems.length > 0 ? (
        <div
          className={`rounded-md p-4 md:sticky top-0 ${
            darkTheme ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          {/* <div className="flex border border-blue-600 overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Promo code"
              className={`w-full outline-none text-sm px-4 py-2.5 ${
                darkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
              }`}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div> */}
          <ul className="mt-4 space-y-1">
            <li className="flex flex-wrap gap-4 text-base">
             Total Discount <span className="ml-auto font-bold">₹{discount}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">₹100</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">₹0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">₹{totalPrice}</span>
            </li>
          </ul>
          <div  onClick={toggleMenu} className="mt-5 flex space-x-4 ">
           
            <Link
                
                to={"/checkout"}
                className="text-sm px-6 py-3 w-full text-center font-semibold tracking-wide text-white bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-md shadow-md hover:shadow-lg"
              >
                Proceed to pay-&gt;
              </Link>
           
          </div>
        </div>
      ) : (
        <div>
          <img src="shpping_cart_no_item.png" alt="img" />
        </div>
      )}
    </div>
  </div>
  
  );
};

export default ShoppingCart;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";

// const ShoppingCart = ({ toggleMenuIcon, setToggleMenuIcon }) => {
//   const items = useSelector((state) => state.cart.items);
//   //console.log("items" , items)
//   const [cartItems, setCartItems] = useState(items.map((item)=>{return item.productId.product}));
//   const dispatch = useDispatch();

//   useEffect(() => {
// // Phele normal kaise store ho raha h bina redux k vo cheak krna h.
//     setCartItems(items.map((item)=>{return item.productId.product}));
//   }, [items]);

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const handleRemoveItem = (item) => {
//     dispatch(removeFromCart(item));
//   };

//   const handleQuantityChange = (id,amount) => {
//     if (items) {
//       if (items.quantity + amount <= 0) {
//         dispatch(removeFromCart(product));
//       } else {
//         dispatch(updateQuantity({ id, amount }));
//       }
//     }
//   };

//   const handleSizeChange = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.productId.id === id ? { ...item, size } : item))
//     );
//   };

//   const handleApplyPromo = () => {
//     if (promoCode === "DISCOUNT10") {
//       setDiscount(10);
//     } else {
//       alert("Invalid promo code!");
//     }
//   };

//   const calculateTotal = () => {
//     const subtotal = items.reduce(
//       (total, item) => total + item.productId.price * item.productId.quantity,
//       0
//     );
//     const shipping = 2.0;
//     const tax = 4.0;
//     const discountAmount = (subtotal * discount) / 100;
//     return subtotal + shipping + tax - discountAmount;
//   };
//   const toggleMenu = () => {
//     setToggleMenuIcon((pre) => (pre == "menu" ? "close" : "menu"));

//     //console.log("hello");
//   };

//   return (
//     <div
//       className={`${
//         toggleMenuIcon === "close" ? "translate-x-0 shadow-lg shadow-black" : "translate-x-full"
//       } 
//       font-sans  w-screen sm:w-fit sm:max-w-96 sm:min-h-screen z-50 absolute sm:top-0 sm:right-0 bg-black 
//       transition-transform duration-500 ease-in-out overflow-x-hidden`}
//     >
//       <div className="gap-4 ">
//         <div className="md:col-span-2  bg-gray-100 p-4 rounded-md">
//           <div className="flex justify-between">
//             <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
//             <button
//               id="toggleOpen"
//               onClick={toggleMenu}
//               className="font-bold material-symbols-outlined"
//             >
//               close
//             </button>
//           </div>
//           <hr className="border-gray-300 mt-4 mb-8" />
//           <div className="space-y-4">
//             {cartItems.length <= 0 ? (
//               <div className="w-full sm:h-52 flex flex-col justify-center items-center font-bold text-pink-500 text-2xl ">
//                 <span>No Items Found!</span>
//                 <span>Please add some items</span>
//               </div>
//             ) : (
              
//               <div className=" sm:h-72 overflow-y-scroll scroll-smooth flex flex-col gap-4">
//                 { cartItems.map((item) => (
//                 <div
//                   key={item.productId._id}
//                   className="grid grid-cols-3 items-center gap-4"
//                 >
//                   <div className="col-span-2 flex items-center gap-4">
//                     <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
//                       <img
//                         src={item.productId.images[0][0]}
//                         className="w-full h-full object-contain"
//                         alt={item.productId.name}
//                       />
//                     </div>
//                     <div>
//                       <h3 className="text-base font-bold text-gray-800">
//                         {item.productId.name}
//                       </h3>
//                       <h6
//                         className="text-xs text-red-500 cursor-pointer mt-0.5"
//                         onClick={() => handleRemoveItem(item)}
//                       >
//                         Remove
//                       </h6>
//                       <div className="flex gap-4 mt-4">
//                         {/* Size Selector */}
//                         <div className="relative group">
//                           <button
//                             type="button"
//                             className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
//                           >
//                             {item.productId.size}
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="w-2.5 fill-gray-500 inline ml-2.5"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
//                                 clipRule="evenodd"
//                                 data-original="#000000"
//                               />
//                             </svg>
//                           </button>
//                           <ul className="group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]">
//                             {["SM", "MD", "XL", "XXL"].map((size) => (
//                               <li
//                                 key={size}
//                                 className="py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer"
//                                 onClick={() => handleSizeChange(item.productId._id, size)}
//                               >
//                                 {size}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                         {/* Quantity Control */}
//                         <div className="flex">
//                           <button
//                             type="button"
//                             className="flex items-center px-2.5 py-1 border border-gray-300 text-gray-800 text-md outline-none bg-transparent rounded-md"
//                             onClick={() => handleQuantityChange(item.productId._id, -1)}
//                           >
//                             -
//                           </button>
//                           <span className="mx-2.5">{item.productId.quantity}</span>
//                           <button
//                             type="button"
//                             className="flex items-center px-2.5 py-1 border border-gray-300 text-gray-800 text-md outline-none bg-transparent rounded-md"
//                             onClick={() => handleQuantityChange(item.productId._id, 1)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="ml-auto">
//                     <h4 className="text-base font-bold text-gray-800">
//                       ${item.productId.price * item.productId.quantity}
//                     </h4>
//                   </div>
//                 </div>
//               ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {cartItems.length > 0 ? (
//           <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
//             <div className="flex border border-blue-600 overflow-hidden rounded-md">
//               <input
//                 type="text"
//                 placeholder="Promo code"
//                 className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={handleApplyPromo}
//                 className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
//               >
//                 Apply
//               </button>
//             </div>
//             <ul className="text-gray-800 mt-4 space-y-1">
//               <li className="flex flex-wrap gap-4 text-base">
//                 Discount <span className="ml-auto font-bold">${discount}</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base">
//                 Shipping <span className="ml-auto font-bold">$2.00</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base">
//                 Tax <span className="ml-auto font-bold">$4.00</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base font-bold">
//                 Total{" "}
//                 <span className="ml-auto">${calculateTotal().toFixed(2)}</span>
//               </li>
//             </ul>
//             <div className="mt-5 flex space-x-4">
//               <Link
//                 to="/checkout"
//                 className="text-sm px-6 py-3 w-full text-center font-semibold tracking-wide text-white bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-md shadow-md hover:shadow-lg"
//               >
//                 Proceed to pay-&gt;
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <img src="no-item-found-img.avif" alt="no img" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;
