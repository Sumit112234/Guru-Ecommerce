// src/features/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products : [
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6ccccb",
      name: "Society Tea",
      images: [
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
          message : "Very Nice Product!"
          
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Anna Smith",
          UserProfilePic: "http://example.com/profiles/annasmith.jpg",
          reviewDate: "2024-09-22T14:30:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4c988b83e881b6cccc9",
      name: "Brooke Bond Taj Mahal Tea 250 g",
      images: [
        ["http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653626/binkeyit/oxwlkfrzv5ijscdbpf6v.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653628/binkeyit/smyv1we0bzqzg26bvmu2.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653629/binkeyit/ikbobcwr0rt2clmmcbcc.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653631/binkeyit/p244cwyl4xyxazvswwkh.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653633/binkeyit/olgigzmuoichvh3wtwm5.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653635/binkeyit/mmckh6rghkrwuiwngt3w.jpg",
      ]],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Sara Lee",
          UserProfilePic: "http://example.com/profiles/saralee.jpg",
          reviewDate: "2024-09-23T16:45:00Z",
          ratings: 5,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa48488b83e881b6cccc3",
      name: "Davidoff Rich Aroma Instant Coffee",
      images: [
       [ "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653564/binkeyit/z95kdvbr4cse08krtsjs.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653566/binkeyit/kwb56qquotjoqetjkbmk.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653567/binkeyit/hlspf2iqgfkntcjlupny.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Tom Wilson",
          UserProfilePic: "http://example.com/profiles/tomwilson.jpg",
          reviewDate: "2024-09-22T14:00:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc8",
      name: "Nescafe Gold Blend Coffee",
      images: [
       [ "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653701/binkeyit/gold1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653702/binkeyit/gold2.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653704/binkeyit/gold3.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "David Clark",
          UserProfilePic: "http://example.com/profiles/davidclark.jpg",
          reviewDate: "2024-09-23T10:30:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc7",
      name: "Tata Sampann Turmeric Powder",
      images: [
       [ "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653750/binkeyit/turmeric1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653752/binkeyit/turmeric2.jpg",
    ]  ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Liam Harris",
          UserProfilePic: "http://example.com/profiles/liamharris.jpg",
          reviewDate: "2024-09-23T14:20:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc6",
      name: "Amul Butter 500g",
      images: [
      [  "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653800/binkeyit/butter1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653802/binkeyit/butter2.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Noah Walker",
          UserProfilePic: "http://example.com/profiles/noahwalker.jpg",
          reviewDate: "2024-09-23T13:15:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc5",
      name: "Britannia Whole Wheat Bread",
      images: [
      [  "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653850/binkeyit/bread1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653852/binkeyit/bread2.jpg",
      ]],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Elijah Scott",
          UserProfilePic: "http://example.com/profiles/elijahscott.jpg",
          reviewDate: "2024-09-23T15:50:00Z",
          ratings: 5,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc4",
      name: "Dettol Handwash",
      images: [
       [ "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653900/binkeyit/handwash1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653902/binkeyit/handwash2.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "James Lewis",
          UserProfilePic: "http://example.com/profiles/jameslewis.jpg",
          reviewDate: "2024-09-24T11:40:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc3",
      name: "Maggi Instant Noodles",
      images: [
      [  "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653950/binkeyit/maggi1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726653952/binkeyit/maggi2.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "William Garcia",
          UserProfilePic: "http://example.com/profiles/williamgarcia.jpg",
          reviewDate: "2024-09-23T18:45:00Z",
          ratings: 5,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc2",
      name: "Samsung Galaxy Buds",
      images: [
       [ "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654000/binkeyit/galaxybuds1.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654002/binkeyit/galaxybuds2.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Amelia Brown",
          UserProfilePic: "http://example.com/profiles/ameliabrown.jpg",
          reviewDate: "2024-09-23T16:45:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    {
      productImage: [],
      _id: "66eaa4e388b83e881b6cccc1",
      name: "Gillette Mach3 Razor",
      images: [
     [   "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654050/binkeyit/mach31.jpg",
        "http://res.cloudinary.com/dljwfy0pe/image/upload/v1726654052/binkeyit/mach32.jpg",
     ] ],
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
          message : "Very Nice Product!"
        },
        {
          userId: "648ccabc1234567890abcdef",
          userName: "Benjamin Harris",
          UserProfilePic: "http://example.com/profiles/benjaminharris.jpg",
          reviewDate: "2024-09-24T09:15:00Z",
          ratings: 4,
          message : "Very Nice Product!"
        },
      ],
    },
    
    
  ], // Array to store products
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // Payload is the list of products
    },
    clearProducts: (state) => {
      state.products = []; // Reset products
    },
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
