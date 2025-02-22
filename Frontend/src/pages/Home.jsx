import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Home = () => {
  const { darkTheme } = useUser();

  const data = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  // console.log(user);

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

  let products = data
    ? data.map(() => {
        return data[Math.floor(Math.random() * data.length)];
      })
    : [];

  const [productDisplay, setProductDisplay] = useState(products.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Summer Collection 2025",
      description: "Discover our latest arrivals with up to 40% off",
      image: "speaker1.png",
      cta: "Shop Now",
    },
    {
      title: "Premium Essentials",
      description: "Curated selection of luxury items",
      image: "speaker2.png",
      cta: "Explore",
    },
    {
      title: "Limited Edition",
      description: "Exclusive designs, limited time only",
      image: "speaker3.png",
      cta: "View Collection",
    },
    {
      title: "Value for Money",
      description: "Exclusive designs, limited time only",
      image: "speaker4.png",
      cta: "View Collection",
    },
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
      setProductDisplay((prev) => [
        ...prev.slice(1),
        products[currentIndex + 1],
      ]);
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
    <div className={`${themeClass} min-h-screen w-full font-serif`}>
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
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                  onClick={() => navigate("/productlist")}
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
                  {idx === 1 &&
                    "Premium quality products at competitive prices"}
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
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Products
        </h2>
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
                onMouseEnter={() => !user && setIsHovered(idx)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {user ? (
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
                      <h3 className="text-lg font-semibold truncate">
                        {product.name}
                      </h3>
                      <p className="mt-2">${product.price}</p>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300" />
                      {isHovered === idx && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white text-black px-4 py-2 rounded-lg shadow-lg text-center">
                            <p className="font-medium">
                              You need to login first!
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Click to login
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold truncate">
                        {product.name}
                      </h3>
                      <p className="mt-2">${product.price}</p>
                    </div>
                  </div>
                )}
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
            initial={{ x: 0, opacity: 0 }}
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
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Empowering Our Journey</h2>
            <p className="text-lg mb-8 opacity-80">
              At GuruElectronics, we bring the latest and most reliable devices
              right to your fingertips. Our mission is to make technology
              accessible, affordable, and tailored to your needs.
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

      <Footer />
    </div>
  );
};

export default Home;
