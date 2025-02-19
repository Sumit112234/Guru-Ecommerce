import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Home = () => {
  const { darkTheme } = useUser();
  const data = useSelector((state) => state.products.products);

  const themeClass = darkTheme
    ? "bg-[#080d1c] text-white"
    : "bg-[#f9f9f9] text-gray-900";

  const buttonThemeClass = darkTheme
    ? "bg-black hover:bg-[#222] text-white"
    : "bg-white hover:bg-gray-200 text-black";

  const cardThemeClass = darkTheme
    ? "bg-gradient-to-t from-[#080d1c] to-[#2c3e75] text-gray-200"
    : "bg-gradient-to-t from-[#ffffff] to-[#e0e7ff] text-gray-900";

  const containerThemeClass = darkTheme
    ? "bg-gradient-to-t from-[#080d1c] to-[#101935] text-white"
    : "bg-gradient-to-t from-[#f9fafb] to-[#e5e7eb] text-gray-900";

  let products = data ? data.map(() => {
    return data[Math.floor(Math.random() * data.length)]
  }) : [];

  const [productDisplay, setProductDisplay] = useState(products.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Summer Collection 2025",
      description: "Discover our latest arrivals with up to 40% off",
      image: "trust_img_1.jpg",
      cta: "Shop Now"
    },
    {
      title: "Premium Essentials",
      description: "Curated selection of luxury items",
      image: "trust_img_13.png",
      cta: "Explore"
    },
    {
      title: "Limited Edition",
      description: "Exclusive designs, limited time only",
      image: "trust_img_11.png",
      cta: "View Collection"
    },
    {
      title: "Value for Money",
      description: "Exclusive designs, limited time only",
      image: "trust_img_12.png",
      cta: "View Collection"
    }
  ];

  useEffect(() => {
    products = data ? data.filter((pro) => pro.ratings >= 3) : [];
    setProductDisplay(products.slice(0, 4));
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex((pre) => pre + 1);
      setProductDisplay((prev) => [...prev.slice(1), products[currentIndex + 1]]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 3) {
      const preIdx = currentIndex - 4;
      setCurrentIndex((pre) => pre - 1);
      setProductDisplay((prev) => [products[preIdx], ...prev.slice(0, -1)]);
    }
  };

  return (
    <div className={`${themeClass} min-h-screen font-serif`}>
      {/* Hero Section */}
      <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="flex flex-col sm:relative sm:h-screen overflow-hidden"
>
  <div 
    className="absolute inset-0 filter blur-xl opacity-50 transition-all duration-700"
    style={{
      backgroundImage: `url(${slides[currentSlide].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />

  <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center h-full">
      {/* Change flex direction */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-8">
        {/* Image Section */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 relative"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="md:w-1/2 text-center md:text-left z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8">
            {slides[currentSlide].description}
          </p>
          <motion.button 
            onClick={()=>navigate('/productlist')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white transition duration-300"
          >
            {slides[currentSlide].cta}
            <ShoppingBag className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
</motion.div>


      {/* Why Choose Us Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${containerThemeClass} p-10`}
      >
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {[1, 2, 3].map((_, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`${cardThemeClass} rounded-lg overflow-hidden shadow-lg`}
            >
              <div className="p-6">
                <img
                  src={`trust_img_1${idx + 1}.png`}
                  alt={`Feature ${idx + 1}`}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-xl font-bold mb-2">
                  {idx === 0 && "Innovative Startup"}
                  {idx === 1 && "A1 Products"}
                  {idx === 2 && "Best Services"}
                </h3>
                <p className="text-sm opacity-80">
                  {idx === 0 && "Leading the way in innovation and technology"}
                  {idx === 1 && "Premium quality products at competitive prices"}
                  {idx === 2 && "Outstanding customer service and support"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trending Products Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Trending Products</h2>
        <div className="relative max-w-7xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
            {productDisplay.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <Link to={`product-detail/${product._id}`}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                    <p className="mt-2">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={handleNext}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>
      </motion.div>

      {/* Tech Journey Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${containerThemeClass} py-16 px-4`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://readymadeui.com/management-img.webp"
              alt="Tech Journey"
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Empowering Our Journey</h2>
            <p className="text-lg mb-8 opacity-80">
              At GuruElectronics, we bring the latest and most reliable devices right to your fingertips.
              Our mission is to make technology accessible, affordable, and tailored to your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Purchase Now!
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <Footer/>
    </div>
  );
};

export default Home;


// import React from "react";
// import Navbar from "../pages/Navbar";
// import Footer from "../pages/Footer";
// import ProductList from "./ProductList";
// import { useEffect, useState } from "react";
// import LandingPage from "./LandingPage";
// import { useUser } from "../context/userContext";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';


// const Home = () => {

//   const { darkTheme } = useUser();
//   console.log(darkTheme)
  

//   const themeClass = darkTheme
//   ? "bg-[#080d1c] text-white"
//   : "bg-[#f9f9f9] text-gray-900";

// const buttonThemeClass = darkTheme
//   ? "bg-black hover:bg-[#222] text-white"
//   : "bg-white hover:bg-gray-200 text-black";

// const cardThemeClass = darkTheme
//   ? "bg-gradient-to-t from-[#080d1c] to-[#2c3e75] text-gray-200 shadow-white"
//   : "bg-gradient-to-t from-[#ffffff] to-[#e0e7ff] text-gray-900 shadow-gray-400";
 
//  const themeClasses = darkTheme
//   ? "bg-gradient-to-t from-[#080d1c] to-[#101935] text-white"
//   : "bg-gradient-to-t from-[#f9fafb] to-[#e5e7eb] text-gray-900";

//   const containerThemeClass = darkTheme
//   ? "bg-gradient-to-t from-[#080d1c] to-[#101935] text-white"
//   : "bg-gradient-to-t from-[#f9fafb] to-[#e5e7eb] text-gray-900";


//   const data = useSelector((state)=>state.products.products) ;
//   let products = data ? data.map(()=>{
//     return (
//       data[Math.floor(Math.random()*data.length)]
//     )
//   }) : [];
  

//   useEffect(()=>{
//     products = data ? data.filter((pro)=> pro.ratings >= 3 ) : [];
//     console.log("data changed ", products);
//     setProductDisplay(products.slice(0,4));
//   },[data])


// // const products = [
// //   {
// //     id: 1,
// //     img: "https://readymadeui.com/images/fashion-img-1.webp",
// //     name: "Lexicon Luxe - Tshirt",
// //     price: "$100.00",
// //     wishlisted: false,
// //   },
// //   {
// //     id: 2,
// //     img: "https://readymadeui.com/images/fashion-img-2.webp",
// //     name: "Adjective Attire - Tshirt",
// //     price: "$120.00",
// //     wishlisted: false,
// //   },
// //   {
// //     id: 3,
// //     img: "https://readymadeui.com/images/fashion-img-3.webp",
// //     name: "Sophisticated Style - Tshirt",
// //     price: "$140.00",
// //     wishlisted: false,
// //   },
// //   {
// //     id: 4,
// //     img: "https://readymadeui.com/images/fashion-img-4.webp",
// //     name: "Elegant Essentials - Tshirt",
// //     price: "$160.00",
// //     wishlisted: false,
// //   },
// //   {
// //     id: 5,
// //     img: "https://readymadeui.com/images/fashion-img-5.webp",
// //     name: "Refined Threads - Tshirt",
// //     price: "$180.00",
// //     wishlisted: false,
// //   },
// //   {
// //     id: 6,
// //     img: "https://readymadeui.com/images/fashion-img-6.webp",
// //     name: "Chic Comfort - Tshirt",
// //     price: "$200.00",
// //     wishlisted: false,
// //   },
// // ];



//   const [productDisplay, setProductDisplay] = useState(
//     products.slice(0, 4)
//   );
//   const [currentIndex,setCurrentIndex] = useState(3);

//   const handleNext = () => {

//     console.log( products.length, currentIndex)
//     if(currentIndex < products.length-1)
//     {
//      setTimeout(() => {
//       setProductDisplay((prev) => {
//         // const nextIndex = currentIndex % products.length;
//         // currentIndex++;
//         setCurrentIndex((pre)=>pre+1);
//         return [...prev.slice(1), products[currentIndex+1]];
//       });
//      }, 100);
//     }
//   };

//   const handlePrevious = () => {
    
    
//     console.log( products.length, currentIndex)
//     if(currentIndex > 3)
//     {
//       setTimeout(() => {
//         setProductDisplay((prev) => {
//           // const prevIndex = (currentIndex - 1 + products.length) % products.length;
//           const preIdx = currentIndex - 4; 
//           // currentIndex--;  
          
//           setCurrentIndex((pre)=>pre-1);
//           return [products[preIdx], ...prev.slice(0, -1)];
//         });
//       }, 100);
//     }
//   };
//   const toggleWishlist = (product)=>{
 
//       let newProducts = productDisplay.map((ele)=>{ return (
//         ele._id === product._id ? {...ele, wishlisted : !ele.wishlisted} : ele
//       )
//       })
 
//       setProductDisplay(newProducts);
//   }

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       title: "Summer Collection 2025",
//       description: "Discover our latest arrivals with up to 40% off",
//       image: "trust_img_1.jpg",
//       cta: "Shop Now"
//     },
//     {
//       title: "Premium Essentials",
//       description: "Curated selection of luxury items",
//       image: "trust_img_13.png",
//       cta: "Explore"
//     },
//     {
//       title: "Limited Edition",
//       description: "Exclusive designs, limited time only",
//       image: "trust_img_11.png",
//       cta: "View Collection"
//     },
//     {
//       title: "Value for Money",
//       description: "Exclusive designs, limited time only",
//       image: "trust_img_12.png",
//       cta: "View Collection"
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };


//   return (<>
   
//    <div className={`relative h-screen overflow-hidden ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>


//       {/* Background Blur Effect */}
//       <div 
//         className="absolute inset-0 filter blur-xl opacity-50"
//         style={{
//           backgroundImage: `url(${slides[currentSlide].image})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       />

//       {/* Content Container */}
//       <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-center h-full">
//           {/* Slider Content */}
//           <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
//             {/* Text Content */}
//             <div className="md:w-1/2 text-center md:text-left z-10">
//               <h1 
//                 className={`text-4xl md:text-6xl font-bold mb-4 ${
//                   darkTheme ? 'text-white' : 'text-gray-900'
//                 }`}
//               >
//                 {slides[currentSlide].title}
//               </h1>
//               <p 
//                 className={`text-lg md:text-xl mb-8 ${
//                   darkTheme ? 'text-gray-300' : 'text-gray-600'
//                 }`}
//               >
//                 {slides[currentSlide].description}
//               </p>
//               <button 
//                 className={`
//                   px-8 py-3 rounded-full flex items-center justify-center gap-2
//                   ${darkTheme 
//                     ? 'bg-purple-600 hover:bg-purple-700 text-white' 
//                     : 'bg-purple-500 hover:bg-purple-600 text-white'
//                   }
//                   transition duration-300 ease-in-out
//                 `}
//               >
//                 {slides[currentSlide].cta}
//                 <ShoppingBag className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Image */}
//             <div className="md:w-1/2 relative">
//               <img
//                 src={slides[currentSlide].image}
//                 alt={slides[currentSlide].title}
//                 className="rounded-lg shadow-2xl"
//               />
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//          <div className="bg-red-500 flex">
//                   <button 
//                   onClick={prevSlide}
//                   className={`
//                     absolute left-4 top-1/2 -translate-y-1/2
//                     p-2 rounded-full 
//                     ${darkTheme 
//                       ? 'bg-gray-800 text-white hover:bg-gray-700' 
//                       : 'bg-white text-gray-800 hover:bg-gray-100'
//                     }
//                     shadow-lg
//                   `}
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button 
//                   onClick={nextSlide}
//                   className={`
//                     absolute right-4 top-1/2 -translate-y-1/2
//                     p-2 rounded-full
//                     ${darkTheme 
//                       ? 'bg-gray-800 text-white hover:bg-gray-700' 
//                       : 'bg-white text-gray-800 hover:bg-gray-100'
//                     }
//                     shadow-lg
//                   `}
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//           </div>

//           {/* Slide Indicators */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`
//                   w-2 h-2 rounded-full transition-all duration-300
//                   ${currentSlide === index 
//                     ? 'w-8 bg-purple-500' 
//                     : `${darkTheme ? 'bg-gray-600' : 'bg-gray-300'}`
//                   }
//                 `}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

    
  
//     <section className={`${themeClass}`}>
//       <div className={`${themeClass}`}>
//         {/* <div className="lg:min-h-[560px] px-4 sm:px-10">
//           <div className="max-w-7xl w-full mx-auto py-16">
//             <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
         
//               <div>
//                 <Link to={'/A-addproducts'} className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">
//                   Checkout our New Product
//                 </Link>
//                 <p className="text-base leading-relaxed">
//                   Unlock the superior level of music that has not been heard
//                   till now and dive into the world of music with this product.
//                 </p>
//                 <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
//                   <button
//                     className={`${buttonThemeClass} flex items-center transition-all font-semibold rounded-md px-5 py-4`}
//                   >
//                     Buy Now
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-[14px] fill-current ml-2"
//                       viewBox="0 0 492.004 492.004"
//                     >
//                       <path d="M484.14 226.886L306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
//                     </svg>
//                   </button>
//                   <button
//                     className={`border-2 flex items-center transition-all font-semibold rounded-md px-5 py-2 ${
//                       darkTheme
//                         ? "border-[#333] text-white"
//                         : "border-gray-300 text-gray-800"
//                     }`}
//                   >
//                     See More like this
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-[14px] fill-current ml-2"
//                       viewBox="0 0 492.004 492.004"
//                     >
//                       <path d="M484.14 226.886L306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//               <div className="max-lg:mt-12 h-full">
//                 <img
//                   src="https://readymadeui.com/analtsis.webp"
//                   alt="banner img"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div> */}
//         <div className={`flex flex-col ${containerThemeClass} p-10`}>
//         <div className="text-center my-6">
//           <h1 className="font-extrabold text-4xl">Why to Choose Us?</h1>
//         </div>

//         <div className="flex justify-around p-4 space-x-24">
//           {[1, 2, 3].map((_, idx) => (
//             <div
//               key={idx}
//               className={`${cardThemeClass} shadow-sm p-3 rounded-lg group overflow-hidden cursor-pointer relative`}
//             >
//               <div className="w-full h-[200px] sm:h-[300px] overflow-hidden relative">
//                 <img
//                   src={`trust_img_1${idx + 1}.png`}
//                   alt={`product${idx + 1}`}
//                   className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-125 group-hover:opacity-70"
//                 />

//                 <div
//                   className={`absolute h-fit inset-x-0 bottom-2 lg:bottom-[-80px] lg:group-hover:top-1/2 lg:group-hover:translate-y-[-50%] lg:group-hover:translate-x-0 transition-all duration-700 ${
//                     darkTheme ? "text-gray-200" : "text-gray-800"
//                   } w-11/12 mx-auto p-3 rounded-lg text-center`}
//                 >
//                   <h3 className={`text-3xl font-bold ${darkTheme ? "text-white" : "text-black"}`}>
//                     {idx === 0 && "Innovative Startup"}
//                     {idx === 1 && "A1 Products"}
//                     {idx === 2 && "Best Services"}
//                   </h3>
//                   <h4 className="text-3xl text-blue-600 font-bold mt-2"></h4>
//                   <div className="flex justify-center space-x-1 mt-4 max-sm:hidden">
//                     {Array(5)
//                       .fill()
//                       .map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-[14px] h-[14px] ${
//                             i < 4 ? "fill-[#facc15]" : "fill-[#CED5D8]"
//                           }`}
//                           viewBox="0 0 14 13"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//                         </svg>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//         <div className={`trending ${themeClasses}`}>
//         <div className="font-[sans-serif] p-4 mx-auto">
//           <h2 className="text-xl sm:text-3xl font-extrabold my-10 mb-6 sm:mb-8 text-center">
//             Our Trending Products
//           </h2>

//           <div className="relative">
//             <button
//               className={`absolute top-1/2 z-50 left-0 text-2xl font-bold transform -translate-y-1/2 rounded-lg p-4 ${
//                 darkTheme ? "bg-gray-200" : "bg-gray-900 text-white"
//               }`}
//               onClick={handlePrevious}
//             >
//               &lt;
//             </button>

//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//               {productDisplay.map((product, idx) => (
//                 <Link
//                   to={'product-detail/' + product._id}
//                   key={idx}
//                   className="group overflow-hidden cursor-pointer relative"
//                 >
//                   <div
//                     className={`w-full overflow-hidden rounded-md ${
//                       darkTheme ? "bg-gray-100" : "bg-gray-300"
//                     }`}
//                   >
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="aspect-[3/4] h-[25rem] w-full object-cover object-top hover:scale-110 transition-all duration-700"
//                     />
//                   </div>
//                   <div className="p-4 relative">
//                     <div
//                       className={`flex flex-wrap justify-between items-center gap-2 w-full absolute px-4 pt-3 z-10 transition-all duration-500 left-0 right-0 group-hover:bottom-20 lg:bottom-5 lg:opacity-0 ${
//                         darkTheme
//                           ? "bg-gray-500 text-white lg:group-hover:opacity-100"
//                           : "bg-gray-100 text-black lg:group-hover:opacity-100"
//                       } max-lg:bottom-20 max-lg:py-3`}
//                     >
//                       <button
//                         type="button"
//                         onClick={() => toggleWishlist(product)}
//                         title="Add to wishlist"
//                         className="bg-transparent outline-none border-none"
//                       >
//                       {product.wishlisted ?  (<span>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-6 h-6 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
//                         </span>)
//                         :
//                         (<span
//                           className={`material-symbols-outlined w-fit ${
//                             product.wishlisted ? "bg-red-500" : ""
//                           }`}
//                         >
//                           favorite
//                         </span>)}
//                       </button>
//                       <button
//                         type="button"
//                         className={`mb-2 rounded-md px-4 py-2 font-bold text-center ${
//                           darkTheme
//                             ? "bg-blue-950 text-gray-300 hover:bg-blue-800"
//                             : "bg-blue-500 text-white hover:bg-blue-600"
//                         }`}
//                       >
//                         Buy Now -&gt;
//                       </button>
//                     </div>
//                     <div className="z-20 relative">
//                       <h6 className="text-sm font-semibold truncate">
//                         {product.name}
//                       </h6>
//                       <h6
//                         className={`text-sm mt-2 ${
//                           darkTheme ? "text-gray-300" : "text-gray-600"
//                         }`}
//                       >
//                         {product.price}
//                       </h6>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//             <button
//               className={`absolute top-1/2 right-0 text-2xl font-bold transform -translate-y-1/2 rounded-lg p-4 ${
//                 darkTheme ? "bg-gray-200" : "bg-gray-900 text-white"
//               }`}
//               onClick={handleNext}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Empowering Your Tech Journey Section */}
//       <div className={`mt-32 rounded-md px-4 py-12 ${themeClasses}`}>
//         <div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
//           <div>
//             <img
//               src="https://readymadeui.com/management-img.webp"
//               alt="Premium Benefits"
//               className="w-full mx-auto"
//             />
//           </div>
//           <div className="max-md:text-center">
//             <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6">
//               Empowering Your Tech Journey
//             </h2>
//             <p className="text-gray-400">
//               At GuruElectronics, we bring the latest and most reliable devices
//               right to your fingertips. Our mission is to make technology
//               accessible, affordable, and tailored to your needs. From
//               smartphones to smart gadgets, we are your trusted partner in
//               discovering the best innovations for your lifestyle.
//             </p>
//             <button
//               type="button"
//               className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10"
//             >
//               Purchase Now!
//             </button>
//           </div>
//         </div>
//       </div>
//       </div>

//       <Footer/>
//     </section>
      
//     </>
//   );
// };

// export default Home;
