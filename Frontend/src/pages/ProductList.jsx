import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { addToCartFunc, updateCartFunc, removeFromCartFunc } from "../helper/CartFunctionality";
import { useUser } from "../context/userContext";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const { darkTheme } = useUser();

  const allCategories = products ? products.flatMap((product) => product.category.map((cat) => cat)) : [];
  const categories = [...new Set(allCategories)];
  const [totalPages, setTotalPages] = useState(products ? Math.ceil(products.length / 9) : 1);
  const [finalProducts, setFinalProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setTimeout(() => setIsLoading(false), 800); // Simulate loading for animation purposes
    }
  }, [products]);

  if (!products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-3xl font-bold text-purple-600"
        >
          No products Found!
        </motion.div>
      </motion.div>
    );
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const addProductToCart = async (productId) => {
    const product = products.find((prod) => prod._id === productId);
    if (product) {
      dispatch(addtoCart({ ...product, quantity: 1 }));
      await addToCartFunc({
        productId,
        quantity: 1,
        userId: user._id,
      });
      toast.success(`${product.name} added to the cart!`);
    }
  };

  const handleQuantityChange = async (productId, amount) => {
    const cartItem = cartItems.find(item => item.productId._id === productId);
    if (!cartItem) return;
    
    let qty = cartItem.quantity + amount;
    dispatch(updateQuantity({ productId, amount }));
    if (qty <= 0) {
      await removeFromCartFunc({ productId, userId: user._id });
      toast.success("Item removed!");
    } else {
      await updateCartFunc({
        productId,
        quantity: qty,
        userId: user._id,
      });
      toast.success(`Item Updated!`);
    }
  };

  const navi = () => {
    //console.log('hello ji');
    navigate('/A-products');
  };

  const handlePagination = (val) => {
    setSelectedPage((pre) => pre + val);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buyNow = async (productId) => {
    await addProductToCart(productId);
    navigate('/checkout');
  };

  useEffect(() => {
    const filteredProducts =
      selectedCategories.length === 0
        ? products
        : products.filter((product) =>
            product.category.some((cat) => selectedCategories.includes(cat))
          );

    setTotalPages(Math.ceil(filteredProducts.length / 9));
    const paginatedProducts = filteredProducts.slice((selectedPage - 1) * 9, selectedPage * 9);
    setFinalProducts(paginatedProducts);
  }, [selectedPage, selectedCategories, products]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const filterVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-3 sm:p-6 transition-colors duration-300`}
      >
        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1
            className={`text-3xl sm:text-5xl uppercase font-bold text-center mb-8 ${darkTheme ? "text-gray-100" : "text-black"}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            All Products
          </motion.h1>

          {/* Mobile Filter Toggle */}
          <motion.button
            className="lg:hidden w-full mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <AnimatePresence>
              {(isFilterVisible || window.innerWidth >= 1024) && (
                <motion.aside
                  variants={filterVariants}
                  initial={window.innerWidth >= 1024 ? "open" : "closed"}
                  animate="open"
                  exit="closed"
                  className={`lg:w-1/4 max-h-screen lg:max-h-[25rem] overflow-y-auto ${
                    darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-black"
                  } p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out`}
                >
                  <motion.h2
                   
                    className={`text-xl font-semibold mb-6 ${darkTheme ? "text-gray-200" : "text-black"} cursor-pointer`}
                    whileHover={{ scale: 1.05, color: "#9333ea" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Filter by Category
                  </motion.h2>
                  <motion.ul className="space-y-1">
                    {categories.map((category, idx) => (
                      <motion.li
                        key={idx}
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <label className="flex items-center gap-3 cursor-pointer p-1 rounded-lg transition-colors duration-200 hover:bg-purple-100 hover:bg-opacity-10">
                          <motion.input
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="w-5 h-5 rounded-md border-2 border-purple-400 text-purple-600 focus:ring-purple-500"
                            whileTap={{ scale: 0.8 }}
                          />
                          <motion.span
                            className="text-lg group-hover:text-purple-400 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                          >
                            {category}
                          </motion.span>
                        </label>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.main
              layout
              className={`flex-1 flex flex-col justify-between ${
                darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-black"
              } p-4 sm:p-6 rounded-xl shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <motion.div
                  className="min-h-[50vh] flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      className="w-16 h-16 border-4 border-t-purple-600 border-r-purple-400 border-b-purple-200 border-l-purple-600 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    ></motion.div>
                    <p className="text-lg font-medium">Loading products...</p>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`products-page-${selectedPage}-categories-${selectedCategories.join('')}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                  >
                    {finalProducts.map((product) => {
                      const cartItem = cartItems.find((item) => item.productId._id === product._id);

                      return (
                        <motion.div
                          key={product._id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.03, y: -5 }}
                          className={`rounded-xl overflow-hidden shadow-lg flex flex-col justify-between ${
                            darkTheme ? "bg-gray-700" : "bg-white"
                          }`}
                        >
              {user ? (
                <Link to={`/product-detail/${product._id}`} className="block relative overflow-hidden group">
                  <motion.div
                    className="h-40 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={product?.images[0] || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <span className="text-white bg-purple-700 bg-opacity-70 px-4 py-2 rounded-full font-medium">
                          View Details
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              ) : (
                <Link to={'/login'} className="block relative overflow-hidden group">
                  <motion.div
                    className="h-40 overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={product?.images[0] || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <span className="text-white bg-red-600 bg-opacity-90 px-4 py-2 rounded-full font-medium text-center">
                          You need to login first!
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              )}
                          <div className="p-3 flex-grow">
                            <motion.h3
                              className={`text-xl font-bold mb-2 ${darkTheme ? "text-purple-400" : "text-black"}`}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              {product.name}
                            </motion.h3>
                            <motion.h3
                              className={`text-lg font-bold mb-4 ${darkTheme ? "text-gray-200" : "text-gray-700"}`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              ₹{Math.floor(product.price - ((product.price*(product.discount))/100))}
                            </motion.h3>
                            <div className="flex flex-col gap-3">
                              {cartItem ? (
                                <motion.div
                                  layout
                                  className="flex items-center justify-center gap-4 bg-purple-100 bg-opacity-10 p-2 rounded-lg"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                  <motion.button
                                    className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                    onClick={() => handleQuantityChange(product._id, -1)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                  >
                                    -
                                  </motion.button>
                                  <motion.span
                                    className="text-lg font-semibold"
                                    key={cartItem.quantity}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                  >
                                    {cartItem.quantity}
                                  </motion.span>
                                  <motion.button
                                    className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                    onClick={() => handleQuantityChange(product._id, 1)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                  >
                                    +
                                  </motion.button>
                                </motion.div>
                              ) : (
                                <motion.button
                                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                                  onClick={() => addProductToCart(product._id)}
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                  Add to Cart
                                </motion.button>
                              )}
                              <motion.button
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                onClick={() => buyNow(product._id)}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                              >
                                Buy Now
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Pagination */}
              <motion.div
                className="mt-12 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.ul
                  className="flex flex-wrap justify-center items-center gap-2"
                  layout
                >
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => handlePagination(-1)}
                    disabled={selectedPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      selectedPage === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    whileHover={selectedPage !== 1 ? { scale: 1.05 } : {}}
                    whileTap={selectedPage !== 1 ? { scale: 0.95 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Prev
                  </motion.button>

                  {/* First Page */}
                  <motion.li
                    key={1}
                    onClick={() => setSelectedPage(1)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPage === 1
                        ? "bg-purple-600 text-white"
                        : `${darkTheme ? "text-white" : "text-gray-800"} border-2 border-purple-400 hover:bg-purple-100 hover:bg-opacity-10`
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    1
                  </motion.li>

                  {/* Ellipsis Before Current Range */}
                  {selectedPage > 3 && <motion.li className="px-2">...</motion.li>}

                  {/* Dynamic Page Numbers */}
                  {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    if (page > 1 && page < totalPages && Math.abs(page - selectedPage) <= 1) {
                      return (
                        <motion.li
                          key={idx}
                          onClick={() => setSelectedPage(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedPage === page
                              ? "bg-purple-600 text-white"
                              : `${darkTheme ? "text-white" : "text-gray-800"} border-2 border-purple-400 hover:bg-purple-100 hover:bg-opacity-10`
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {page}
                        </motion.li>
                      );
                    }
                    return null;
                  })}

                  {/* Ellipsis After Current Range */}
                  {selectedPage < totalPages - 2 && <motion.li className="px-2">...</motion.li>}

                  {/* Last Page */}
                  {totalPages > 1 && (
                    <motion.li
                      key={totalPages}
                      onClick={() => setSelectedPage(totalPages)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPage === totalPages
                          ? "bg-purple-600 text-white"
                          : `${darkTheme ? "text-white" : "text-gray-800"} border-2 border-purple-400 hover:bg-purple-100 hover:bg-opacity-10`
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {totalPages}
                    </motion.li>
                  )}

                  {/* Next Button */}
                  <motion.button
                    onClick={() => handlePagination(1)}
                    disabled={selectedPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      selectedPage === totalPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    whileHover={selectedPage !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={selectedPage !== totalPages ? { scale: 0.95 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Next
                  </motion.button>
                </motion.ul>
              </motion.div>
            </motion.main>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ProductList;