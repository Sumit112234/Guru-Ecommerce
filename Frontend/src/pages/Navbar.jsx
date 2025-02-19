import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { Menu, Moon, Sun, User, X, ShoppingCart } from "lucide-react";

const Navbar = ({ toggleMenuIcon, setToggleMenuIcon }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { darkTheme, setDarkTheme } = useUser();
  const products = useSelector((state) => state.products.products);
  const [isLogin, setIsLogin] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const matches = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matches);
    }
  };
  const toggleMenu = () => {
        setToggleMenuIcon((pre) => (pre == "menu" ? "close" : "menu"));
      };
  const handleSearchFilter = (product) => {
    setSearchQuery(product.name);
    setFilteredProducts([]);
    setIsMobileMenuOpen(false);
    navigate("/product-detail/" + product._id);
  };

  const handleLogout = async () => {
    dispatch(removeUser());
    let res = await fetch(`${backendUrl}user/logout`, {
      credentials: "include",
    });
    res = await res.json();
    if (res.success) {
      toast.success(`Logged Out success.`);
      navigate("/login");
    } else {
      toast.success(`Couldn't log out!`);
    }
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } sticky top-0 z-50 w-full border-b bg-opacity-95 shadow-sm backdrop-blur`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="font-bold text-xl sm:text-2xl">
              <span className="text-purple-600">GURU</span>
              <span className="text-opacity-75 text-blue-800">ELECTRONICS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Search Bar - Desktop */}
            <div className="relative w-[37rem]   ">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full h-10 pl-10 pr-4 rounded-full border border-purple-600 focus:outline-none ${
                  darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                </svg>
              </div>
              {filteredProducts.length > 0 && (
                <div
                  className={`absolute top-12 left-0 w-full rounded-lg shadow-lg z-50 p-2 ${
                    darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  {filteredProducts.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSearchFilter(product)}
                      className={`block px-4 py-2 ${
                        darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      } rounded-md cursor-pointer`}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/productlist" className="font-bold hover:text-purple-600">
              Products
            </Link>

            <button
              onClick={() => setDarkTheme(!darkTheme)}
              className={`p-2 rounded-full transition-colors ${
                darkTheme
                  ? "bg-purple-700 text-yellow-300 hover:bg-purple-600"
                  : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
              }`}
            >
              {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isLogin ? (
              <div className="flex items-center space-x-4">
                <button  onClick={toggleMenu} className="relative">
                 <span className="material-symbols-outlined">shopping_cart</span>
                  {cartItems && cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                <div className="dropdown-container relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-1 p-2 rounded-full hover:bg-opacity-80"
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {showDropdown && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                        darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                      }`}
                    >
                      {user ? (
                        user.role === "User" ? (
                          <>
                            <Link
                              to="/myaccount"
                              className={`block px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              My Account
                            </Link>
                            <Link
                              to="/myorders"
                              className={`block px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              My Orders
                            </Link>
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              Logout
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/A-orders"
                              className={`block px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              All Orders
                            </Link>
                            <Link
                              to="/A-products"
                              className={`block px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              All Products
                            </Link>
                            <Link
                              to="/A-addproducts"
                              className={`block px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              Add a new Product
                            </Link>
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              Logout
                            </button>
                          </>
                        )
                      ) : (
                        <Link
                          to="/login"
                          className={`block px-4 py-2 text-sm ${
                            darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 font-medium rounded-lg px-5 py-2.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={toggleMenu} className="relative">
            <span className="material-symbols-outlined">shopping_cart</span>

              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="menu-button inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          <div className={`px-4 pt-2 pb-3 space-y-1 ${
            darkTheme ? "bg-gray-900" : "bg-gray-100"
          }`}>
            {/* Search Bar - Mobile */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full h-10 pl-10 pr-4 rounded-full border border-purple-600 focus:outline-none ${
                  darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                </svg>
              </div>
              {filteredProducts.length > 0 && (
                <div
                  className={`absolute top-12 left-0 w-full rounded-lg shadow-lg z-50 p-2 ${
                    darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  {filteredProducts.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSearchFilter(product)}
                      className={`block px-4 py-2 ${
                        darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      } rounded-md cursor-pointer`}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <Link
              to="/productlist"
              className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>

            {/* Theme Toggle - Mobile */}
            <div className="flex items-center justify-between py-2 px-4">
              <span className="text-base font-medium">Dark Mode</span>
              <button
                onClick={() => setDarkTheme(!darkTheme)}
                className={`p-2 rounded-full transition-colors ${
                  darkTheme
                    ? "bg-purple-700 text-yellow-300 hover:bg-purple-600"
                    : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                }`}
              >
                {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* User Menu - Mobile */}
            {user ? (
              user.role === "User" ? (
                <>
                  <Link
                    to="/myaccount"
                    className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/myorders"
                    className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/A-orders"
                    className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Orders
                  </Link>
                  <Link
                    to="/A-products"
                    className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/A-addproducts"
                    className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add a new Product
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { removeUser } from "../redux/slices/userSlice";
// import { toast } from "react-toastify";
// import { useUser } from "../context/userContext";
// import { Moon, Sun, User } from "lucide-react";

// const Navbar = ({ toggleMenuIcon, setToggleMenuIcon }) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const user = useSelector((state) => state.user.user);
//   const navigate = useNavigate();
//   const { darkTheme, setDarkTheme } = useUser();
//   const products = useSelector((state)=>state.products.products);
//   const [isLogin, setIsLogin] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.trim() === "") {
//       setFilteredProducts([]);
//     } else {
//       const matches = products
//         .filter((product) =>
//           product.name.toLowerCase().includes(query.toLowerCase())
//         )
      
//       setFilteredProducts(matches);
//     }
//   };

//   const handleSearchFilter = (product)=>{
//     setSearchQuery(product.name);
//     setFilteredProducts([]);
//     navigate('/product-detail/' + product._id);
//   }

//   const toggleMenu = () => {
//     setToggleMenuIcon((pre) => (pre == "menu" ? "close" : "menu"));
//   };

//   const handleLogout = async () => {
//     dispatch(removeUser());
//     let res = await fetch(`${"http://localhost:8759/api/"}user/logout`, {
//       credentials: "include",
//     });
//     res = await res.json();
//     if (res.success) {
//       toast.success(`Logged Out success.`);
//       navigate("/login");
//     } else {
//       toast.success(`Couldn't log out!`);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showDropdown && !event.target.closest('.dropdown-container')) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showDropdown]);

//   return (
//     <>
//       <header
//         className={`${
//           darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//         } sticky top-0 py-4 z-50 w-full border-b bg-opacity-95 shadow-sm backdrop-blur`}
//       >
//         <div className="main">
//           <div className="flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4 px-4">
//             <Link to={"/"} className="text-center sm:text-start">
//               <div className="font-bold text-2xl">
//                 <span className="text-purple-600">GURU</span>
//                 <span className="text-opacity-75 text-blue-800">ELECTRONICS</span>
//               </div>
//             </Link>

//             {/* Search Bar */}
//             <div className="relative border border-purple-600 focus-within:border-black focus-within:bg-transparent flex px-6 rounded-full h-10 lg:w-2/4 mt-1 mx-auto max-lg:mt-6">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 192.904 192.904"
//                 width="16px"
//                 className="fill-gray-600 mr-3 rotate-90"
//               >
//                 <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search Products"
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className={`w-full outline-none bg-transparent font-semibold text-[15px] ${
//                   darkTheme ? "text-white" : "text-black"
//                 }`}
//               />

//               {/* Search Results Dropdown */}
//               {filteredProducts.length > 0 && (
//                 <div
//                   className={`absolute top-11 left-0 w-full rounded-lg shadow-lg z-50 p-2 ${
//                     darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
//                   }`}
//                 >
//                   {filteredProducts.slice(0,5).map((product) => (
//                     <div
//                       key={product._id}
//                       onClick={()=>handleSearchFilter(product)}
//                       className={`block px-4 py-2 ${darkTheme ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} rounded-md cursor-pointer`}
//                     >
//                       {product.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link to={"/productlist"} className="font-bold text-xl hover:underline">
//                 Products
//               </Link>
//               <button 
//                 onClick={() => setDarkTheme(!darkTheme)}
//                 className={`p-2 rounded-full transition-colors 
//                   ${darkTheme 
//                     ? 'bg-purple-700 text-yellow-300 hover:bg-purple-600' 
//                     : 'bg-yellow-200 text-gray-800 hover:bg-yellow-300'
//                   }`}
//               >
//                 {darkTheme ? <Sun /> : <Moon />}
//               </button>

//               {isLogin ? (
//                 <div className="flex items-center ml-auto space-x-8">
//                   <button onClick={toggleMenu} className="relative text-xl cursor-pointer">
//                     <span className="material-symbols-outlined">shopping_cart</span>
//                     <span className="absolute left-auto -ml-1 -top-1 rounded-full px-1 py-0 text-xs text-white">
//                       {cartItems ? cartItems.length : 0}
//                     </span>
//                   </button>

//                   {/* User Dropdown Container */}
//                   <div className="dropdown-container relative">
//                     <button 
//                       onClick={() => setShowDropdown(!showDropdown)}
//                       className="flex items-center space-x-1 p-2 rounded-full hover:bg-opacity-80"
//                     >
//                       <User className="h-5 w-5" />
//                     </button>

//                     {/* Dropdown Menu */}
//                     {showDropdown && (
//                       <div 
//                         className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
//                           ${darkTheme 
//                             ? 'bg-gray-800 text-white' 
//                             : 'bg-white text-gray-900'
//                           }`}
//                       >
//                         {user ?
//                         user.role === 'User' ? (
//                           <>
//                             <Link 
//                               to="/myaccount"
//                               className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                             >
//                               My Account
//                             </Link>
//                             <Link 
//                               to="/myorders"
//                               className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                             >
//                               My Orders
//                             </Link>
//                             <button
//                               onClick={handleLogout}
//                               className={`block w-full text-left px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                             >
//                               Logout
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                           <Link 
//                             to="/A-orders"
//                             className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                           >
//                             All Orders
//                           </Link>
//                           <Link 
//                             to="/A-products"
//                             className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                           >
//                             All Products
//                           </Link>
//                           <Link 
//                             to="/A-addproducts"
//                             className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                           >
//                             Add a new Product
//                           </Link>
//                           <button
//                             onClick={handleLogout}
//                             className={`block w-full text-left px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                           >
//                             Logout
//                           </button>
//                         </>
//                         ) :
//                         <Link 
//                         to="/login"
//                         className={`block px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                       >
//                         Login
//                       </Link> }
//                       </div>
//                     )}
//                   </div>

//                   <button onClick={toggleMenu} className="sm:hidden material-symbols-outlined">
//                     {toggleMenuIcon}
//                   </button>
//                 </div>
//               ) : (
//                 <Link to="/login" className="login signup">
//                   <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 font-medium rounded-lg px-5 py-2.5">
//                     Login
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;