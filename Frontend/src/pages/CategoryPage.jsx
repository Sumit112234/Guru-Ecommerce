import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addtoCart, updateQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { addToCartFunc, removeFromCartFunc, updateCartFunc } from "../helper/CartFunctionality";
import { useUser } from "../context/userContext";
import Footer from "./Footer";
const CategoryPage = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);

  // const products = useSelector((state) => state.products.products);
  const products = [
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6ccccb",
      name: "Society Tea",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653655/binkeyit/rojutzqmqkhbyvsrfavt.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653657/binkeyit/twkbbyetdgwfpdgxsvmk.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653658/binkeyit/c6rwihxicfpienxsxjsj.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653659/binkeyit/vfafsh0gkl3w9sqkbltw.jpg",
      ],
      unit: "1 Unit",
      stock: 1,
      price: 635,
      discount: 45,
      description: "Society Tea",
      publish: true,
      createdAt: "2024-09-18T10:01:07.633Z",
      updatedAt: "2024-09-24T07:43:48.371Z",
      __v: 0,
      category: ["Tea"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "John Doe",
          UserProfilePic: "http://example.com/profiles/johndoe.jpg",
          reviewDate: "2024-09-20T12:00:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Anna Smith",
          UserProfilePic: "http://example.com/profiles/annasmith.jpg",
          reviewDate: "2024-09-22T14:30:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4c988b83e881b6cccc9",
      name: "Brooke Bond Taj Mahal Tea 250 g",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653626/binkeyit/oxwlkfrzv5ijscdbpf6v.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653628/binkeyit/smyv1we0bzqzg26bvmu2.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653629/binkeyit/ikbobcwr0rt2clmmcbcc.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653631/binkeyit/p244cwyl4xyxazvswwkh.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653633/binkeyit/olgigzmuoichvh3wtwm5.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653635/binkeyit/mmckh6rghkrwuiwngt3w.jpg",
      ],
      unit: "1 Unit",
      stock: 9,
      price: 560,
      discount: 43,
      description: "Brooke Bond Taj Mahal Tea 250 g",
      publish: true,
      createdAt: "2024-09-18T10:00:41.984Z",
      updatedAt: "2024-09-18T10:00:41.984Z",
      __v: 0,
      category: ["Tea"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Mike Johnson",
          UserProfilePic: "http://example.com/profiles/mikejohnson.jpg",
          reviewDate: "2024-09-21T09:15:00Z",
          ratings: 4,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Sara Lee",
          UserProfilePic: "http://example.com/profiles/saralee.jpg",
          reviewDate: "2024-09-23T16:45:00Z",
          ratings: 5,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa48488b83e881b6cccc3",
      name: "Davidoff Rich Aroma Instant Coffee",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653564/binkeyit/z95kdvbr4cse08krtsjs.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653566/binkeyit/kwb56qquotjoqetjkbmk.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653567/binkeyit/hlspf2iqgfkntcjlupny.jpg",
      ],
      unit: "1 Unit",
      stock: 369,
      price: 984,
      discount: 36,
      description: "Davidoff Rich Aroma Instant Coffee",
      publish: true,
      createdAt: "2024-09-18T09:59:32.216Z",
      updatedAt: "2024-09-18T09:59:32.216Z",
      __v: 0,
      category: ["Coffee"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Lucy Brown",
          UserProfilePic: "http://example.com/profiles/lucybrown.jpg",
          reviewDate: "2024-09-20T11:00:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Tom Wilson",
          UserProfilePic: "http://example.com/profiles/tomwilson.jpg",
          reviewDate: "2024-09-22T14:00:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc8",
      name: "Nescafe Gold Blend Coffee",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653701/binkeyit/gold1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653702/binkeyit/gold2.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653704/binkeyit/gold3.jpg",
      ],
      unit: "1 Unit",
      stock: 150,
      price: 799,
      discount: 30,
      description: "Premium Nescafe Gold Blend Coffee",
      publish: true,
      createdAt: "2024-09-20T09:45:21.124Z",
      updatedAt: "2024-09-24T08:30:50.621Z",
      __v: 0,
      category: ["Coffee"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Emma Green",
          UserProfilePic: "http://example.com/profiles/emmagreen.jpg",
          reviewDate: "2024-09-22T12:15:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "David Clark",
          UserProfilePic: "http://example.com/profiles/davidclark.jpg",
          reviewDate: "2024-09-23T10:30:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc7",
      name: "Tata Sampann Turmeric Powder",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653750/binkeyit/turmeric1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653752/binkeyit/turmeric2.jpg",
      ],
      unit: "1 Pack",
      stock: 200,
      price: 85,
      discount: 10,
      description: "100% Pure and Natural Turmeric Powder",
      publish: true,
      createdAt: "2024-09-19T10:12:05.784Z",
      updatedAt: "2024-09-19T10:12:05.784Z",
      __v: 0,
      category: ["Spices"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Sophia Turner",
          UserProfilePic: "http://example.com/profiles/sophiaturner.jpg",
          reviewDate: "2024-09-21T08:45:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Liam Harris",
          UserProfilePic: "http://example.com/profiles/liamharris.jpg",
          reviewDate: "2024-09-23T14:20:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc6",
      name: "Amul Butter 500g",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653800/binkeyit/butter1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653802/binkeyit/butter2.jpg",
      ],
      unit: "1 Pack",
      stock: 80,
      price: 250,
      discount: 5,
      description: "Rich and Creamy Amul Butter",
      publish: true,
      createdAt: "2024-09-18T11:30:12.543Z",
      updatedAt: "2024-09-20T09:30:45.321Z",
      __v: 0,
      category: ["Dairy"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Ava Brown",
          UserProfilePic: "http://example.com/profiles/avabrown.jpg",
          reviewDate: "2024-09-22T17:45:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Noah Walker",
          UserProfilePic: "http://example.com/profiles/noahwalker.jpg",
          reviewDate: "2024-09-23T13:15:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc5",
      name: "Britannia Whole Wheat Bread",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653850/binkeyit/bread1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653852/binkeyit/bread2.jpg",
      ],
      unit: "1 Pack",
      stock: 300,
      price: 40,
      discount: 0,
      description: "Soft and Fresh Whole Wheat Bread",
      publish: true,
      createdAt: "2024-09-19T09:10:05.231Z",
      updatedAt: "2024-09-20T11:45:15.984Z",
      __v: 0,
      category: ["Bakery"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Mia Johnson",
          UserProfilePic: "http://example.com/profiles/miajohnson.jpg",
          reviewDate: "2024-09-21T07:30:00Z",
          ratings: 4,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Elijah Scott",
          UserProfilePic: "http://example.com/profiles/elijahscott.jpg",
          reviewDate: "2024-09-23T15:50:00Z",
          ratings: 5,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc4",
      name: "Dettol Handwash",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653900/binkeyit/handwash1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653902/binkeyit/handwash2.jpg",
      ],
      unit: "1 Bottle",
      stock: 100,
      price: 150,
      discount: 20,
      description: "Antibacterial Dettol Handwash",
      publish: true,
      createdAt: "2024-09-18T08:45:10.987Z",
      updatedAt: "2024-09-19T14:20:35.432Z",
      __v: 0,
      category: ["Personal Care"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Olivia Martinez",
          UserProfilePic: "http://example.com/profiles/oliviamartinez.jpg",
          reviewDate: "2024-09-22T10:15:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "James Lewis",
          UserProfilePic: "http://example.com/profiles/jameslewis.jpg",
          reviewDate: "2024-09-24T11:40:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc3",
      name: "Maggi Instant Noodles",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653950/binkeyit/maggi1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653952/binkeyit/maggi2.jpg",
      ],
      unit: "1 Pack",
      stock: 500,
      price: 12,
      discount: 0,
      description: "Quick & Tasty Maggi Instant Noodles",
      publish: true,
      createdAt: "2024-09-17T13:10:25.234Z",
      updatedAt: "2024-09-20T10:45:40.123Z",
      __v: 0,
      category: ["Snacks"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Charlotte Adams",
          UserProfilePic: "http://example.com/profiles/charlotteadams.jpg",
          reviewDate: "2024-09-21T16:30:00Z",
          ratings: 4,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "William Garcia",
          UserProfilePic: "http://example.com/profiles/williamgarcia.jpg",
          reviewDate: "2024-09-23T18:45:00Z",
          ratings: 5,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc2",
      name: "Samsung Galaxy Buds",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654000/binkeyit/galaxybuds1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654002/binkeyit/galaxybuds2.jpg",
      ],
      unit: "1 Unit",
      stock: 50,
      price: 9999,
      discount: 15,
      description: "Wireless Samsung Galaxy Buds with Noise Cancellation",
      publish: true,
      createdAt: "2024-09-15T14:25:50.789Z",
      updatedAt: "2024-09-18T12:10:25.654Z",
      __v: 0,
      category: ["Electronics"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Ethan White",
          UserProfilePic: "http://example.com/profiles/ethanwhite.jpg",
          reviewDate: "2024-09-22T14:30:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Amelia Brown",
          UserProfilePic: "http://example.com/profiles/ameliabrown.jpg",
          reviewDate: "2024-09-23T16:45:00Z",
          ratings: 4,
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc1",
      name: "Gillette Mach3 Razor",
      image: [
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654050/binkeyit/mach31.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654052/binkeyit/mach32.jpg",
      ],
      unit: "1 Unit",
      stock: 120,
      price: 300,
      discount: 10,
      description: "Smooth Shaving with Gillette Mach3 Razor",
      publish: true,
      createdAt: "2024-09-14T15:45:35.654Z",
      updatedAt: "2024-09-18T09:20:50.123Z",
      __v: 0,
      category: ["Personal Care"],
      reviews: [
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Sofia Robinson",
          UserProfilePic: "http://example.com/profiles/sofiarobinson.jpg",
          reviewDate: "2024-09-21T11:30:00Z",
          ratings: 5,
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Benjamin Harris",
          UserProfilePic: "http://example.com/profiles/benjaminharris.jpg",
          reviewDate: "2024-09-24T09:15:00Z",
          ratings: 4,
        },
      ],
    },
    
    
  ];
  
  const user = useSelector((state) => state.user.user); 
  const cartItems = useSelector((state) => state.cart.items); 
  const { darkTheme } = useUser();

  const allCategories = products.flatMap((product) => product.category.map((cat) => cat));
  const categories = [...new Set(allCategories)];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const addToCart = async (productId) => {
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

  const handleQuantityChange = async(productId, amount) => {

    let qty = cartItems.quantity + amount;

    dispatch(updateQuantity({ productId, amount }));
    if(qty <= 0)
    {
      await removeFromCartFunc({ productId, userId: user._id });
      toast.success(`Item removed!`);
    }
    else{
      await updateCartFunc({
                      productId,
                      quantity: qty,
                      userId: user._id,
                    });
                    toast.success(`Item Updated!`);
      
    }
  };

  const buyNow = (productId) => {
    toast.info(`Proceeding to buy product ID: ${productId}`);
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((product) =>
          product.category.some((cat) => selectedCategories.includes(cat))
        );

  return (
    <div className={`${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>
    <div className="container mx-auto">
      <h1 className={`text-3xl font-bold text-center mb-8 ${darkTheme ? "text-gray-100" : "text-black"}`}>
        Shop by Category
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside
          className={`lg:w-1/4 ${
            darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-black"
          } p-4 rounded-lg shadow-md`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${darkTheme ? "text-gray-200" : "text-black"}`}>
            Filter by Category
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className={`rounded border-gray-300 ${
                      darkTheme ? "text-blue-400 focus:ring-blue-600" : "text-blue-600 focus:ring-blue-400"
                    }`}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <main
          className={`flex-1 ${
            darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-black"
          } p-4 rounded-lg shadow-md`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find((item) => item.productId._id === product._id);
  
              return (
                <div
                  key={product._id}
                  className={`rounded overflow-hidden shadow-md hover:scale-105 transition-transform ${
                    darkTheme ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Link to={`/product-detail/${product._id}`} className="block">
                    <div className="h-40">
                      <img
                        src={product.image[0] || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className={`text-lg font-bold ${darkTheme ? "text-gray-200" : "text-black"}`}>
                      {product.name}
                    </h3>
                    <div className="mt-4 flex gap-2">
                      {cartItem ? (
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 bg-red-600 text-white rounded"
                            onClick={() => handleQuantityChange(product._id, -1)}
                          >
                            -
                          </button>
                          <span className="px-4">{cartItem.quantity}</span>
                          <button
                            className="px-2 py-1 bg-green-600 text-white rounded"
                            onClick={() => handleQuantityChange(product._id, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={() => addToCart(product._id)}
                        >
                          Add to Cart
                        </button>
                      )}
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => buyNow(product._id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>


  </div>
  
  );
};

export default CategoryPage;