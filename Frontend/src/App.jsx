import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import CheakOutPage from './components/CheakOut'
// import SetNewPassword from './pages/setNewPassword';
import MyOrders from './pages/MyOrders'
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import { useEffect, useState } from 'react';
import AddProductsTodatabase from './utils/AddProductsTodatabase';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/slices/productSlice';
import MyCart from './utils/MyCart';
import Protected from './components/Protected';
import CategoryPage from './pages/CategoryPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from './lib/getToken';
import { verifyToken } from './lib/verifyToken';
import { getUser } from './lib/getUser';
import { addUser } from './redux/slices/userSlice';
import { setCartState } from './redux/slices/cartSlice';
import { getCartFunc } from './helper/CartFunctionality';
import ProductList from './pages/ProductList';
import AllOrders from './pages/admin/AllOrders';
// import UserDetails from './pages/admin/UserDetails';
import AllProducts from './pages/admin/AllProducts';
import ThankyouPage from './pages/ThankyouPage';
import  AddProductPage from './pages/admin/AddProduct';
import MyAccount from './pages/UserAccount';
import UserDetails from './pages/admin/UserDetail';
import {AboutPage, TermsPage} from './pages/subpages/About';


function App() {


  const dispatch = useDispatch();
  let backendUrl = import.meta.env.VITE_APP_SERVER_URL;
  async function getdata(){

    let user = await getUser();
    let cart = await getCartFunc(user?.data?.user?._id);
    dispatch(addUser(user?.data?.user));
    //console.log(user);
    // //console.log(cart)
    dispatch(setCartState(cart?.cart))
    //console.log("user from App.jsx : ", user?.data?.user,user, cart);
  }
 
  async function fetchProducts(){

    try {
      let result = await fetch(`${backendUrl}product/get-product`)
       result = await result.json();

      //console.log(result.data);
      // setProducts(result.data);
      dispatch(setProducts(result.data));
      // dispatch(setProducts(data));


    } catch (error) {
      //console.log("some error occured in fetching products");
    }

}
  useEffect(()=>{
    getdata();
    fetchProducts();
  },[])
        
  
  const [toggleMenuIcon,setToggleMenuIcon] = useState('menu');
 
  // useEffect(()=>{
   
  //   const checkToken = async () => {

  //     //console.log("call")
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       const isValid = await verifyToken(token);
  //       if (isValid) {
  //         const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  //         // dispatch(setUser(user));
  //         //console.log("mil gaya Token");
  //       } else {
  //         localStorage.removeItem('authToken');
  //         // dispatch(clearUser());
  //         alert('Session expired. Please log in again.');
  //       }
  //     }
  //   };

  //   // checkToken();
  // },[dispatch])

  return (
    <>
    <div className="scroll-smooth">
      {toggleMenuIcon === "close" && 
         <div onClick={()=>setToggleMenuIcon('menu')} className='absolute bg-gray-500 opacity-80 blur top-0 w-screen h-full'>
          
        </div>}
    <Navbar toggleMenuIcon={toggleMenuIcon} setToggleMenuIcon={setToggleMenuIcon} />
    <ShoppingCart toggleMenuIcon={toggleMenuIcon} setToggleMenuIcon={setToggleMenuIcon}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms&condition" element={<TermsPage />} />

        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/checkout" element={<Protected> < CheakOutPage/></Protected>} />
        {/* <Route path="/set-password" element={<SetNewPassword/>} /> */}
        <Route path="/myorders" element={<Protected><MyOrders/></Protected>} />
        <Route path="/myaccount" element={<Protected><MyAccount/></Protected>} />
        <Route path="/product-detail/:id" element={<Protected><ProductDetail/></Protected>} />
        <Route path="/categories" element={<CategoryPage/>} />
        <Route path="/addProduct" element={<AddProductsTodatabase/>} /> 
        <Route path="/test" element={<MyCart/>} /> 
        <Route path="/productlist" element={<ProductList/>} /> 
        <Route path="/thank-you" element={<ThankyouPage/>} /> 
        {/* <Route path="/cart" element={<ShoppingCart toggleMenuIcon={toggleMenuIcon} setToggleMenuIcon={setToggleMenuIcon}/>} /> */}
        <Route path="/A-orders" element={<AllOrders/>} /> 
        <Route path="/A-products" element={<Protected><AllProducts/></Protected>} /> 
        <Route path="/A-addproducts" element={<AddProductPage/>} /> 
        <Route path="/A-userDetails/:_id" element={<UserDetails/>} /> 
        
      </Routes>
        <ToastContainer position='top-center'/>
    </div>
  </>

  )
}

export default App
