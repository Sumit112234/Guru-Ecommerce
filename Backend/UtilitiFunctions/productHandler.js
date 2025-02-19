import cartProduct from "../models/cartProduct.js";
import order from "../models/order.js";
import Product from "../models/Product.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});



// Upload images to Cloudinary
async function uploadImagesToCloudinary(files) {

    // console.log("files :", files);
    let uploadedImages = [];

    for (let file of files) {
        try {
            // Convert buffer to Base64 string correctly
            let base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

            let result = await cloudinary.v2.uploader.upload(base64String, {
                folder: "products",
                resource_type: "image", 
            });

            uploadedImages.push(result.secure_url);
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
        }
    }
    // console.log("uploaded images : ", uploadedImages);
    return uploadedImages;
}



export async function addProduct(req, res) {
    try {
        const { name, category, unit, stock, price, discount, ratings, trending, tags, description, reviews, publish } = req.body;
        let images = req.files || [];

        // Ensure category is an array
        const categoryArray = Array.isArray(category) ? category : [category];

        // Upload images to Cloudinary
        const uploadedImages = await uploadImagesToCloudinary(images);
        

        const newProduct = new Product({

            name,
            images : uploadedImages,
            category: categoryArray,
            unit,
            stock,
            price,
            discount,
            ratings,
            trending,
            tags,
            description,
            reviews,
            publish,
        });
        await newProduct.save();

        return res.status(201).json({
            message: "Product added successfully.",
            status: true,
            error: false,
            data: newProduct,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Failed to add product.",
            status: false,
            error: true,
        });
    }
}


// Update Product
async function uploadImagesToCloudinaryNormally(files) {
    let uploadedImages = [];

    for (let file of files) {
        try {
            let result = await cloudinary.v2.uploader.upload(file, {
                folder: "products",
                resource_type: "image",
            });

            uploadedImages.push(result.secure_url);
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
        }
    }

    return uploadedImages;
}

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        let updatedData = req.body;
        
        // 674aa388fcdf1683fe488baa
        // console.log("🔍 req.files:", req.files);
        // console.log("🔍 req.body:", req.body);

        
        // let notUploadedImages = Array.isArray(updatedData.images) 
        //     ? updatedData.images.filter(image => !image.startsWith('http')) 
        //     : []; 

      
        // let uploadedImages = Array.isArray(updatedData.images) 
        //     ? updatedData.images.filter(image => image.startsWith('http')) 
        //     : []; 
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found.", status: false, error: true });
        }

        if (updatedData.reviews) {
            product.reviews.push(...updatedData.reviews);
        }

        const oldImages = updatedData.uploadedImages || [];
        let Images = [];
        if (req.files && req.files.length > 0) {
            Images = await uploadImagesToCloudinary(req.files);
        }
        
        updatedData.images = updatedData.image ? updatedData.image : [...Images, ...oldImages];
        
        // Merge new and existing images
        // console.log("new Images : ", newImages)
        // console.log("old Images : ", uploadedImages);

        // updatedData.images = newImages.length === 0 ? uploadedImages : newImages;

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found.", status: false, error: true });
        }

        return res.status(200).json({ message: "Product updated successfully.", status: true, error: false, data: updatedProduct });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Failed to update product.", status: false, error: true });
    }
}
export async function addReview(req, res) {
    try {
        const { id } = req.params;
        const { userId, userName, ratings, message } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found.", status: false, error: true });
        }

        // Append new review to the existing array
        const newReview = {
            userId,
            userName,
            ratings,
            message,
            reviewDate: new Date(),
        };

        product.reviews.push(newReview);
        await product.save(); // Save only the review changes

        return res.status(200).json({ message: "Review added successfully.", status: true, error: false, data: product.reviews });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Failed to add review.", status: false, error: true });
    }
}

// export async function cheakoutSuccess(req, res) {
//     try {
//       const { userId, paymentId } = req.body;
  
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({ error: "Invalid userId" });
//       }
  
//       // 1️⃣ Get all cart items of the user
//       const cartItems = await cartProduct.find({ userId }).populate("productId");
  
//       if (cartItems.length === 0) {
//         return res.status(400).json({ error: "No products in cart!" });
//       }
  
//       // 2️⃣ Create an order for each cart item
//       const orders = cartItems.map((cartItem) => ({
//         userId: userId,
//         orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`, // Unique order ID
//         quantity: cartItem.quantity,
//         product_details: cartItem.productId, // Store product details
//         payment_id: paymentId,
//         payment_status: "Paid",
//         delivery_status: "Processing",
//         subTotalAmt: cartItem.productId.price * cartItem.quantity, // Calculate subtotal
//         totalAmt: cartItem.productId.price * cartItem.quantity, // Adjust based on discounts/taxes
//       }));
  
//       // 3️⃣ Save orders to the database
//       await order.insertMany(orders);
  
//       // 4️⃣ Delete cart items after saving the order
//       await cartProduct.deleteMany({ userId });
  
//       res.status(200).json({ message: "Order placed successfully", orders });
//     } catch (error) {
//       console.error("Error processing order:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
  




export const createOrder = async (req, res) => {
    try {
        const { userId, payment_id, payment_status, delivery_address,payment_type } = req.body;
        let userData = req.user;
        // Fetch cart items
        const cartItems = await cartProduct.find({ userId }).populate("productId");

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Create an order entry
        const newOrder = new order({
            userId,
            orderId: `ORD-${Date.now()}`,
            product_details: cartItems.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
            })),
            payment_id,
            payment_status,
            payment_type,
            delivery_address,
            delivery_status: "pending",
            subTotalAmt: cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
            totalAmt: cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0), // Can add tax/shipping if needed
        });

        await newOrder.save();
        userData.orderHistory.push(newOrder._id);
        await userData.save();
        // Clear user's cart after order creation
        await cartProduct.deleteMany({ userId });

        res.status(201).json({ message: "Order created successfully", newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await order.find({ userId }).populate("product_details.productId");

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};


// _id
// 67ab76150fe6859bc9675f32
// userId
// "67aad3312c1c265e07bb09fb"
// orderId
// "ORD-1739290133159"
// quantity
// "1"

// product_details
// Array (4)
// payment_id
// "1234"
// payment_status
// "Pending"
// delivery_address
// 67ab756f0fe6859bc9675f0d
// delivery_status
// "pending"
// subTotalAmt
// 2336
// totalAmt
// 2336

// Delete Product
export async function deleteProduct(req, res) {
    try {

        const { id } = req.params;
        console.log(id);
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found.", status: false, error: true });
        }
        return res.status(200).json({ message: "Product deleted successfully.", status: true, error: false });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Failed to delete product.",
            status: false,
            error: true,
        });
    }
}

// export async function addProduct(req, res) {
//     try {
       
        
//  // Destructure images from the request body and split the comma-separated string into an array

//         const { images } = req.body;
//         console.log(req.body);
//         const imageArray = images.split(',').map(img => img.trim());
 
//         // Create the product object with the images array
//         const product = {
//             ...req.body,
//             images: imageArray
//         };

//         console.log(product);
//         const newProduct = new Product(product);
//         await newProduct.save();

//         return res.status(200).json({
//             message: "Product added successfully.",
//             status: true,
//             error: false,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({
//             message: "Failed to add product.",
//             status: false,
//             error: true,
//         });
//     }
// }

export async function addMultipleProduct(req, res) {
    try {
       
        
        const products = req.body;

        // return res.json(products);

        products.forEach(async(product)=>{
           try{
            let newProduct = new Product(product);
            await newProduct.save();
           }
           catch(e)
           {
                console.log("e for error : ", e, product);

           }
        })


        

        return res.status(200).json({
            message: "Product added successfully.",
            status: true,
            error: false,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Failed to add product.",
            status: false,
            error: true,
        });
    }
}

export async function getProduct(req, res) {
    try {
       

        let products = await Product.find();

        return res.status(200).json({
            message: "Product added successfully.",
            status: true,
            error: false,
            data : products
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Failed to get product.",
            status: false,
            error: true,
        });
    }
}
export async function getProductById(req, res) {
    try {
        
        let {id} = req.query;
     

        let product = await Product.findOne({_id : id});

        return res.status(200).json({
            message: "Product find success",
            status: true,
            error: false,
            data : product
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "No Produxct found.",
            status: false,
            error: true,
        });
    }
}

