import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { useUser } from "../context/userContext";
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../pages/Footer';
import { addReview, updateProductAPI } from "../helper/productFuntionality";
import { addToCartFunc } from "../helper/CartFunctionality";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetch product from Redux
  const AllProducts = useSelector((state) =>
    state.products.products
  );
  const [product,setProduct] = useState(AllProducts.find((item) => item._id === id));

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item._id === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [itemQty, setItemQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { darkTheme } = useUser();
  const user = useSelector((state)=>state.user.user);

  const addProductToCart = async (productId) => {
    try {
      setIsAddingToCart(true);
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
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const toggleReview = () => {
    setShowAllReviews((pre) => !pre);
  };

  useEffect(()=>{
    setProduct(AllProducts.find((item) => item._id === id));
  },[id,product])

  const [stars, setStars] = useState(5);
    
  useEffect(() => {
    if (product?.images[0]) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true);
      dispatch(addtoCart({ ...product, quantity: 1 }));
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };
  
  const handleChangeImage = (image) => {
    setSelectedImage(image);
  };

  const handleBuyNow = async() => {
    // handleAddToCart();
    await addProductToCart(product._id);
    navigate('/checkout');
  };

  const handleQuantityChange = (amount) => {
    if (cartItem) {
      if (cartItem.quantity + amount <= 0) {
        dispatch(removeFromCart(product));
      } else {
        dispatch(updateQuantity({ id: cartItem._id, amount }));
      }
    }
  };
  
  const products = AllProducts.filter((pro) => pro.category.find((cate) => cate === product?.category[0]));
  
  const submitReview = async () => {
    if (!reviewText.trim()) {
      toast.error("Please enter a review before submitting.");
      return;
    }

    setLoading(true);
    // console.log(user);
    let review = { userId: user._id, userName: user.name, ratings: stars, message: reviewText, reviewDate: new Date() };
    try {
      await addReview(product._id, review);
      toast.success(`Review added!`);
      setReviewText("");
      // console.log(product.reviews , review)
      
      // let newReview = product;
      // newReview.reviews.push(review);

      // setProduct(newReview)
      setStars(5);
    } catch (error) {
      toast.error("Failed to add review. Please try again.");
    } finally {
      setLoading(false);
    }
  };
    
  const [startIndex, setStartIndex] = useState(0);
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i} 
        className={`w-[14px] h-[14px] ${i < rating ? 'fill-purple-600' : 'fill-gray-300'}`} 
        viewBox="0 0 14 13"
      >
        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
      </svg>
    ));
  };
  
  const handleNextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
  };
  
  const handlePrevSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (!product) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-screen"
    >
      <p className="text-xl">Product not found</p>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={`font-[sans-serif] ${darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}
    >
      <div className="lg:max-w-6xl max-w-xl mx-auto p-4">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">

          <motion.div 
            variants={itemVariants}
            className="w-full lg:sticky top-0"
          >
            <div className="flex flex-col gap-4">
              <motion.div 
                className={`shadow p-2 ${darkTheme ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  layoutId={`product-image-${product._id}`}
                  src={selectedImage} 
                  alt="Product" 
                  className="w-full aspect-[11/8] object-cover object-top" 
                />
              </motion.div>
              <div className={`p-2 w-full max-w-full overflow-auto ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-start flex-row gap-4 shrink-0">
                  {product && product.images.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md ${
                        selectedImage === image ? 'border-2 border-purple-600' : 'border-2 border-transparent'
                      }`}
                      onClick={() => handleChangeImage(image)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="w-full"
          >
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-bold"
              >
                {product.name || 'SunProtect Sunscreen SPF'}
              </motion.h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <p className="text-base">{product.reviews ? product.reviews[0]?.ratings : 3}</p>
                  <div className="flex">
                    {product.reviews && product.reviews.map((ele, idx) => (
                      <motion.svg 
                        key={idx} 
                        className="w-4 h-4 fill-purple-600" 
                        viewBox="0 0 14 13"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
                <span className="text-gray-500">|</span>
                <p className="text-sm">{product.reviews ? product.reviews.length : 0} Reviews</p>
              </div>
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm md:text-base">{product.description}</p>
              </motion.div>

              <motion.div 
                className="flex items-center flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-base">
                  <strike>${16}</strike>
                </p>
                <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">${product.price}</h4>
                <motion.div 
                  className="flex py-1 px-2 bg-purple-600 font-semibold !ml-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-sm">save {product.discount}%</span>
                </motion.div>
              </motion.div>

              <div>
                <h4 className="text-base mt-4 font-semibold">Net Wt: 100G</h4>
              </div>
            </div>

            <hr className={`my-6 ${darkTheme ? 'border-gray-700' : 'border-gray-300'}`} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className={`flex gap-2 items-center border px-3 py-2.5 w-max ${
                  darkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
                }`}
              >
                <motion.button
                  onClick={() => setItemQty((pre) => Math.max(pre - 1, 0))}
                  type="button"
                  className="border-none outline-none"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                    <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z" />
                  </svg>
                </motion.button>
                <span className="text-sm font-semibold px-3">{itemQty}</span>
                <motion.button
                  onClick={() => setItemQty((pre) => pre + 1)}
                  type="button"
                  className="border-none outline-none"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
                    <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z" />
                    <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z" />
                  </svg>
                </motion.button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <motion.button
                  type="button"
                  onClick={() => addProductToCart(product._id)}
                  className={`px-4 py-3 w-full sm:w-[45%] border text-sm font-semibold flex justify-center items-center gap-2 ${
                    darkTheme
                      ? 'border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700'
                      : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-t-transparent border-purple-600 rounded-full"
                    />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to cart
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleBuyNow}
                  className={`px-4 py-3 w-full sm:w-[45%] border text-sm font-semibold ${
                    darkTheme
                      ? 'border-purple-700 bg-purple-800 text-white hover:bg-purple-900'
                      : 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy it now
                </motion.button>
              </div>
            </motion.div>

            <hr className={`my-6 ${darkTheme ? 'border-gray-700' : 'border-gray-300'}`} />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 ${
            darkTheme ? "bg-gray-800" : "bg-white"
          } ${darkTheme ? "text-gray-300" : "text-gray-800"} rounded-lg`}
        >
          <motion.h3 
            className="text-4xl font-bold my-4 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Customer Reviews
          </motion.h3>
          <div className="gap-4 mt-4">

            {/* add your review */}
            <motion.div 
              className="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              {/* Star Rating */}
              <div className="stars flex justify-center items-center w-fit">
                {[...Array(5)].map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setStars(i + 1)}
                    className="mx-0.5 my-4"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className={`w-5 h-5 ${i < stars ? "fill-yellow-400" : "fill-gray-400"}`}
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  </motion.button>
                ))}
                <p className="ml-2">{stars}.0</p>
              </div>

              {/* Review Textarea */}
              <motion.textarea
                className={`p-2 w-full rounded-md 
                  ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}
                  focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300`}
                placeholder="Enter your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                rows={4}
              />

              {/* Submit Button */}
              <motion.button
                className={`bg-purple-600 hover:bg-purple-800 text-white rounded-md py-2 px-4 my-2 font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={submitReview}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                    />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review</span>
                )}
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {showAllReviews && product.reviews && product.reviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.reviews.map((review, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between px-4 py-3 space-y-2">
                        <div>
                          <div className="flex w-fit justify-center items-center space-x-2">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              src={review.UserProfilePic || "https://readymadeui.com/team-2.webp"}
                              alt={review.userName}
                              className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <h4 className={`text-lg font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-800'}`}>{review.userName}</h4>
                          </div>
                          <div className="details flex flex-col ">
                            <p className="text-sm mt-3 text-gray-400">{review.message || "No comments provided."}</p>
                            <p className="text-sm mt-3 text-gray-400">
                              {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : "27/12/2003"}
                            </p>
                          </div>
                        </div>

                        <div className="ratings">
                          <div className="ml-3">
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(review.ratings)].map((_, i) => (
                                <motion.svg
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.05 * i }}
                                  className="w-4 h-4 fill-yellow-600"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </motion.svg>
                              ))}
                              {[...Array(5 - review.ratings)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 fill-gray-400"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                              ))}
                              <p className="text-xs !ml-2 font-semibold text-gray-800">
                                {review.reviewDate 
                                  ? new Date(review.reviewDate).toLocaleString("en-US", {
                                      month: "short", day: "numeric", year: "numeric"
                                    })
                                  : "Dec 27, 2003"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        className="line p-[1px] w-[95%] mx-auto bg-gray-700"
                        initial={{ width: "0%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {showAllReviews && (!product.reviews || product.reviews.length === 0) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center my-4"
                >
                  No one has reviewed it yet. Be the first to review it!
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div 
              onClick={toggleReview}
              className="flex items-center justify-center mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.p className="text-blue-600 text-sm cursor-pointer font-semibold flex items-center gap-1">
                {showAllReviews ? "Hide all reviews" : "Read all reviews"}
                <motion.span
                  animate={{ y: showAllReviews ? 2 : -2 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                >
                  {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </motion.span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* similar products */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 ${
            darkTheme ? "bg-gray-800" : "bg-white"
          } ${darkTheme ? "text-gray-300" : "text-gray-800"} rounded-lg`}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h1 className="text-center text-4xl font-semibold">Similar Products</h1>
          </motion.div>

          <div className="products mt-8">
            <div className={`p-6 transition-colors duration-300 
              ${darkTheme 
                ? 'bg-gray-900 text-purple-100' 
                : 'bg-purple-50 text-gray-800'
              } rounded-lg`}
            >
              <div className="relative">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 relative">
                  {products.slice(startIndex, startIndex + (window.innerWidth < 640 ? 2 : 4)).map((product, index) => (
                    <motion.div 
                      key={index} 
                      className={`transform transition-all duration-300 
                        ${darkTheme 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-white hover:bg-purple-50'
                        } 
                        flex flex-col overflow-hidden cursor-pointer hover:shadow-lg rounded-lg`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <Link to={'/product-detail/'+product._id} className="w-full overflow-hidden">
                        <motion.img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full object-cover object-top aspect-[230/307]"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>

                      <div className={`p-3 flex-1 flex flex-col 
                        ${darkTheme ? 'text-purple-100' : 'text-gray-800'}`}>
                        <div className="flex-1">
                          <h5 className="text-sm sm:text-base font-bold truncate">{product.name}</h5>
                          <p className={`mt-1 truncate ${darkTheme ? 'text-purple-300' : 'text-gray-500'}`}>
                            {product.description}
                          </p>
                          <div className="flex flex-wrap justify-between gap-2 mt-2">
                            <div className="flex flex-wrap justify-between gap-2 mt-2">
                              <div className="flex gap-2">
                                <h6 className="text-sm sm:text-base font-bold">${product.price}</h6>
                                <h6 className="text-sm sm:text-base text-gray-500 line-through">${product.originalPrice}</h6>
                              </div>
                              <div className="flex items-center gap-0.5">
                                {renderStars(product.ratings)}
                              </div>
                           </div>
                         </div>
                <div className="flex items-center gap-2 mt-4">
                  <div 
                    className={`w-12 h-9 flex items-center justify-center rounded cursor-pointer 
                      ${darkTheme 
                        ? 'bg-purple-700 hover:bg-purple-600' 
                        : 'bg-pink-100 hover:bg-pink-200'
                      }`}
                    title="Wishlist"
                  >
                    <Heart 
                      className={`${darkTheme ? 'text-purple-300' : 'text-pink-600'}`} 
                      size={18} 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={()=>addProductToCart(product._id)}
                    className={`text-sm px-2 min-h-[36px] w-full rounded transition-colors 
                      ${darkTheme 
                        ? 'bg-purple-700 hover:bg-purple-600 text-purple-100' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              </div>
            </motion.div >
          ))}
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button 
            onClick={handlePrevSlide}
            className={`p-2 rounded-full transition-colors 
              ${darkTheme 
                ? 'bg-purple-800 text-purple-300 hover:bg-purple-700' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
              }`}
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={handleNextSlide}
            className={`p-2 rounded-full transition-colors 
              ${darkTheme 
                ? 'bg-purple-800 text-purple-300 hover:bg-purple-700' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
              }`}
          >
            <ChevronRight />
          </button>
          
        </div>
      </div>
    </div>
      </div>

  </motion.div>
  </div>
      <Footer/>
</motion.div>



       
   
  );
};


export default ProductDetail;
 



                            
// import React, { useState, useEffect } from "react";
// import { useParams , Link} from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addtoCart, removeFromCart ,updateQuantity } from "../redux/slices/cartSlice";
// import { useUser } from "../context/userContext";
// import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';
// import Footer from '../pages/Footer'
// import { addReview, updateProductAPI } from "../helper/productFuntionality";
// import { addToCartFunc } from "../helper/CartFunctionality";
// import { toast } from "react-toastify";



// const ProductDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   // Fetch product from Redux
//   const product = useSelector((state) =>
//     state.products.products.find((item) => item._id === id)
//   );
//   const AllProducts = useSelector((state) =>
//     state.products.products
//   );

//   const cartItems = useSelector((state) => state.cart.items);
//   const cartItem = cartItems.find((item) => item._id === id);

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [itemQty, setItemQty] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [reviewText, setReviewText] = useState("");

//   const { user , darkTheme } = useUser();

// const addProductToCart = async (productId) => {
//     const product = products.find((prod) => prod._id === productId);
//     if (product) {
//       dispatch(addtoCart({ ...product, quantity: 1 }));
//       await addToCartFunc({
//         productId,
//         quantity: 1,
//         userId: user._id,
//       });
//       toast.success(`${product.name} added to the cart!`);
//     }
//   };
  
//   const toggleReview = ()=>{
//     setShowAllReviews((pre)=>!pre);
//   }

//     const [stars, setStars] = useState(1);
    

 

//   useEffect(() => {
//     // if (product?.image[0]) {
//     //   setSelectedImage(product.image[0]);
//     // }
//     if (product?.images[0]) {
//       setSelectedImage(product.images[0]);
//     }
//   }, [product]);

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//   };

//   const handleAddToCart = () => {
//     console.log('product from productDetail : ', product);
//     if (product) {
//       dispatch(addtoCart({ ...product,  quantity: 1 }));
//     }
//   };
//   const handleChangeImage = (image) => {
//    setSelectedImage(image);
//   };

//   const handleBuyNow = () => {
//     alert(
//       `Proceeding to buy ${product.name} (Size: ${selectedSize || "Not selected"}).`
//     );
//   };

//   const handleQuantityChange = (amount) => {
//     if (cartItem) {
//       if (cartItem.quantity + amount <= 0) {
//         dispatch(removeFromCart(product));
//       } else {
//         dispatch(updateQuantity({ id: cartItem._id, amount }));
//       }
//     }
//   };
//   const products = AllProducts.filter((pro)=>pro.category.find((cate)=>cate === product.category[0]));
  
//   const submitReview = async () => {
//     if (!reviewText.trim()) {
//       alert("Please enter a review before submitting.");
//       return;
//     }

//       setLoading(true);
//       console.log(product.reviews)
     
//       let review = { userId : user._id, userName : user.name, ratings : stars, message : reviewText }
//       console.log(review)
//       await addReview(product._id , review)
//       toast.success(`Review added!`);
//       setLoading(false);

   
//   };
    
//     const [startIndex, setStartIndex] = useState(0);
  
//     const renderStars = (rating) => {
//       return Array.from({ length: 5 }, (_, i) => (
//         <svg 
//           key={i} 
//           className={`w-[14px] h-[14px] ${i < rating ? 'fill-purple-600' : 'fill-gray-300'}`} 
//           viewBox="0 0 14 13"
//         >
//           <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//         </svg>
//       ));
//     };
  
//     const handleNextSlide = () => {
//       setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
//     };
  
//     const handlePrevSlide = () => {
//       setStartIndex((prevIndex) => 
//         prevIndex === 0 ? products.length - 1 : prevIndex - 1
//       );
//     };

//   if (!product) return <p>Product not found</p>;

//   return (
//     <>
// <div className={`font-[sans-serif] p-4 ${darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
//   <div className="lg:max-w-6xl max-w-xl mx-auto">
//     <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">

//       <div className="w-full lg:sticky top-0">
//         <div className="flex flex-col gap-4">
//           <div className={`shadow p-2 ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
//             <img src={selectedImage} alt="Product" className="w-full aspect-[11/8] object-cover object-top" />
//           </div>
//           <div className={`p-2 w-full max-w-full overflow-auto ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="flex justify-start flex-row gap-4 shrink-0">
              
//               {product && product.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md ${
//                     selectedImage === image ? 'border-b-2 border-black' : 'border-b-2 border-transparent'
//                   }`}
//                   onClick={() => handleChangeImage(image)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full">
//         <div>
//           <h3 className="text-lg sm:text-xl font-bold">{product.name || 'SunProtect Sunscreen SPF'}</h3>
//           <div className="flex items-center gap-3 mt-1">
//             <div className="flex items-center gap-1">
//               <p className="text-base">{product.reviews ? product.reviews[0]?.ratings : 3}</p>
//               {product.reviews && product.reviews.map((ele, idx) => (
//                 <svg key={idx} className="w-4 h-4 fill-purple-600" viewBox="0 0 14 13">
//                   <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="text-gray-500">|</span>
//             <p className="text-sm">{product.reviews ? product.reviews.length : 0} Reviews</p>
//           </div>
//           <div className="mt-2">
//             <p className="text-sm">{product.description}</p>
//           </div>

//           <div className="flex items-center flex-wrap gap-2 mt-4">
//             <p className="text-base">
//               <strike>${16}</strike>
//             </p>
//             <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">${product.price}</h4>
//             <div className="flex py-1 px-2 bg-purple-600 font-semibold !ml-4">
//               <span className="text-white text-sm">save {product.discount}%</span>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-base mt-4 font-semibold">Net Wt: 100G</h4>
//           </div>
//         </div>

//         <hr className={`my-6 ${darkTheme ? 'border-gray-700' : 'border-gray-300'}`} />

//         <div>
//           <div
//             className={`flex gap-2 items-center border px-3 py-2.5 w-max ${
//               darkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
//             }`}
//           >
//             <button
//               onClick={() => setItemQty((pre) => Math.max(pre - 1, 0))}
//               type="button"
//               className="border-none outline-none"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
//                 <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z" />
//               </svg>
//             </button>
//             <span className="text-sm font-semibold px-3">{itemQty}</span>
//             <button
//               onClick={() => setItemQty((pre) => pre + 1)}
//               type="button"
//               className="border-none outline-none"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
//                 <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z" />
//                 <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-4 flex flex-wrap gap-4">
//             <button
//               type="button"
//               onClick={()=>addProductToCart(product._id)}
//               className={`px-4 py-3 w-[45%] border text-sm font-semibold ${
//                 darkTheme
//                   ? 'border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700'
//                   : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
//               }`}
//             >
//               Add to cart
//             </button>
//             <button
//               type="button"
//               className={`px-4 py-3 w-[45%] border text-sm font-semibold ${
//                 darkTheme
//                   ? 'border-purple-700 bg-purple-800 text-white hover:bg-purple-900'
//                   : 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
//               }`}
//             >
//               Buy it now
//             </button>
//           </div>
//         </div>

//         <hr className={`my-6 ${darkTheme ? 'border-gray-700' : 'border-gray-300'}`} />
//       </div>
//     </div>
    
//     <div
//   class={`mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 ${
//     darkTheme ? "bg-gray-800" : "bg-white"
//   } ${darkTheme ? "text-gray-300" : "text-gray-800"}`}
// >
//   <h3 class="text-4xl font-bold my-4 mb-8 text-center">Customer Reviews</h3>
//   <div class="gap-4 mt-4">

//   {/* add your review */}
//   <div className="review">
//       {/* Star Rating */}
//       <div className="stars flex justify-center items-center w-fit">
//         {[...Array(5)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setStars(i + 1)}
//             className="mx-0.5 my-4"
//           >
//             <svg
//               className={`w-5 h-5 ${i < stars ? "fill-yellow-400" : "fill-gray-400"}`}
//               viewBox="0 0 14 13"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//             </svg>
//           </button>
//         ))}
//         <p className="ml-2">{stars}.0</p>
//       </div>

//       {/* Review Textarea */}
//       <textarea
//         className={`p-2 w-full rounded-md ${
//           darkTheme ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
//         }`}
//         placeholder="Enter your review"
//         value={reviewText}
//         onChange={(e) => setReviewText(e.target.value)}
//       />

//       {/* Submit Button */}
//       <button
//         className="bg-purple-600 hover:bg-purple-800 text-white rounded-md py-1 px-2 my-2 font-semibold"
//         onClick={submitReview}
//         disabled={loading}
//       >
//         {loading ? "Submitting..." : "Submit Review"}
//       </button>
//     </div>
  

//     <div className="reviews">
           

//   {showAllReviews ?
//    (
//     product.reviews && product.reviews.length > 0 ? (
//       product.reviews.map((review, index) => (
//         <>
//         <div key={index} className="flex justify-between px-4 py-3 space-y-2">
//          <div>
//          <div className="flex w-fit justify-center items-center space-x-2">
//          <img
//             src={review.UserProfilePicc || "https://readymadeui.com/team-2.webp"}
//             alt={review.userName}
//             className="w-12 h-12 rounded-full border-2 border-white"
//           />
//             <h4 className={`text-lg font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-800'}`}>{review.userName}</h4>
//          </div>
//          <div className="details flex flex-col ">
//          <p className="text-sm mt-3 text-gray-400">{review.message || "No comments provided."}</p>
//          <p className="text-sm mt-3 text-gray-400">{"27/12/2003"}</p>
//          </div>
//          </div>

//          <div className="ratings">
//          <div className="ml-3">
//             {/* <h4 className={`text-lg font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-800'}`}>{review.userName}</h4> */}
//             <div className="flex items-center space-x-1 mt-1">
//               {[...Array(review.ratings)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className="w-4 h-4 fill-yellow-600"
//                   viewBox="0 0 14 13"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//                 </svg>
//               ))}
//               {[...Array(5 - review.ratings)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className="w-4 h-4  fill-gray-400"
//                   viewBox="0 0 14 13"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//                 </svg>
//               ))}
//               <p className="text-xs !ml-2 font-semibold text-gray-800">
//                 {new Date(review.reviewDate).toLocaleString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
            
//           </div>
//          </div>
          
//         </div>
//         <div className="line p-[1px] w-[95%] mx-auto bg-gray-700">
          
//         </div>
//         </>
//       ))
//     ) : (
//       <p>No one has reviewed it yet. Be the first to review it!</p>
//     )
//   ) : null}

//   <div onClick={toggleReview}>
//     <p className="text-blue-600 text-sm mt-6 cursor-pointer font-semibold">
//       {showAllReviews ? "Hide all reviews" : "Read all reviews"}
//     </p>
//   </div>
// </div>
//   </div>
// </div>


//   {/* similar products */}
//   <div className={`mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 ${
//     darkTheme ? "bg-gray-800" : "bg-white"
//   } ${darkTheme ? "text-gray-300" : "text-gray-800"}`}>
    


//       <div>
//         <h1 className="text-center text-4xl font-semibold">Similar Products</h1>
//       </div>

//       <div className="products">
//       <div 
//       className={`min-h-screen p-6 transition-colors duration-300 
//         ${darkTheme 
//           ? 'bg-gray-900 text-purple-100' 
//           : 'bg-purple-50 text-gray-800'
//         }`}
//     >
      

//       <div className="relative">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 relative">
//           {products.slice(startIndex, startIndex + 4).map((product, index) => (
//             <div 
//               key={index} 
//               className={`transform transition-all duration-300 
//                 ${darkTheme 
//                   ? 'bg-gray-800 hover:bg-gray-700' 
//                   : 'bg-white hover:bg-purple-50'
//                 } 
//                 flex flex-col overflow-hidden cursor-pointer hover:shadow-lg rounded-lg`}
//             >
//               <Link to={'/product-detail/'+product._id} className="w-full">
//                 <img 
//                   src={product.images[0] } 
//                   alt={product.name} 
//                   className="w-full object-cover object-top aspect-[230/307]" 
//                 />
//               </Link>

//               <div className={`p-3 flex-1 flex flex-col 
//                 ${darkTheme ? 'text-purple-100' : 'text-gray-800'}`}>
//                 <div className="flex-1">
//                   <h5 className="text-sm sm:text-base font-bold truncate">{product.name}</h5>
//                   <p className={`mt-1 truncate ${darkTheme ? 'text-purple-300' : 'text-gray-500'}`}>
//                     {product.description}
//                   </p>
//                   <div className="flex flex-wrap justify-between gap-2 mt-2">
//                     <div className="flex gap-2">
//                       <h6 className="text-sm sm:text-base font-bold">${product.price}</h6>
//                       <h6 className="text-sm sm:text-base text-gray-500 line-through">${product.originalPrice}</h6>
//                     </div>
//                     <div className="flex items-center gap-0.5">
//                       {renderStars(product.ratings)}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 mt-4">
//                   <div 
//                     className={`w-12 h-9 flex items-center justify-center rounded cursor-pointer 
//                       ${darkTheme 
//                         ? 'bg-purple-700 hover:bg-purple-600' 
//                         : 'bg-pink-100 hover:bg-pink-200'
//                       }`}
//                     title="Wishlist"
//                   >
//                     <Heart 
//                       className={`${darkTheme ? 'text-purple-300' : 'text-pink-600'}`} 
//                       size={18} 
//                     />
//                   </div>
//                   <button 
//                     type="button" 
//                     onClick={()=>addProductToCart(product._id)}
//                     className={`text-sm px-2 min-h-[36px] w-full rounded transition-colors 
//                       ${darkTheme 
//                         ? 'bg-purple-700 hover:bg-purple-600 text-purple-100' 
//                         : 'bg-purple-600 hover:bg-purple-700 text-white'
//                       }`}
//                   >
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
//           <button 
//             onClick={handlePrevSlide}
//             className={`p-2 rounded-full transition-colors 
//               ${darkTheme 
//                 ? 'bg-purple-800 text-purple-300 hover:bg-purple-700' 
//                 : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
//               }`}
//           >
//             <ChevronLeft />
//           </button>
//           <button 
//             onClick={handleNextSlide}
//             className={`p-2 rounded-full transition-colors 
//               ${darkTheme 
//                 ? 'bg-purple-800 text-purple-300 hover:bg-purple-700' 
//                 : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
//               }`}
//           >
//             <ChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//       </div>

//   </div>
//   </div>
//             <Footer/>
// </div>



       
//     </>
//   );
// };


// export default ProductDetail;
 

