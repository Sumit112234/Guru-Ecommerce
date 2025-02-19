import User from '../models/user.js'
import Product from '../models/product.js';
import cartProduct from '../models/cartProduct.js';


export async function addToCart(req, res) {
    try {
        const { productId, quantity = 1, userId } = req.body;

        
        if (!productId || !userId) {
            return res.status(400).json({ error: "Product ID and User ID are required." });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        // Check if the user exists (optional depending on your setup)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find the cart item for the user and product
        let cartItem = await cartProduct.findOne({ productId, userId });

        if (cartItem) {
            // Update quantity if the item already exists in the cart
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: "Cart item updated successfully.", cartItem });
        } else {
            // Create a new cart item if it doesn't exist
            const newCartItem = await cartProduct.create({ productId, quantity, userId });
            return res.status(200).json({ message: "Product added to cart successfully.", cartItem: newCartItem });
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while adding the product to the cart.",
            details: error.message
        });
    }
}

// Update product quantity in user's cart
export async function updateCart(req, res) {
    try {
        const { productId, quantity, userId } = req.body;

        // Validate inputs
        if (!productId || !userId) {
            return res.status(400).json({ error: "Product ID and User ID are required." });
        }

        if (quantity === undefined || isNaN(quantity)) {
            return res.status(400).json({ error: "Valid quantity is required." });
        }

        // Find the cart item for the user and product
        const cartItem = await cartProduct.findOne({ productId, userId });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found." });
        }

        // Update the quantity or remove the item if quantity is <= 0
        cartItem.quantity += quantity;

        if (cartItem.quantity <= 0) {
            await cartProduct.findByIdAndDelete(cartItem._id);
            return res.status(200).json({ message: "Product removed from cart due to zero or negative quantity." });
        }

        await cartItem.save();
        res.status(200).json({ message: "Cart updated successfully.", cartItem });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the cart.",
            details: error.message,
        });
    }
}

// Remove product from user's cart
export async function removeFromCart(req, res) {
    try {
        const { productId, userId } = req.body;

        // Validate inputs
        if (!productId || !userId) {
            return res.status(400).json({ error: "Product ID and User ID are required." });
        }

        // Find and remove the cart item
        const cartItem = await cartProduct.findOneAndDelete({ productId, userId });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found." });
        }

        
        res.status(200).json({ message: "Product removed from cart successfully.", cartItem });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while removing the product from the cart.",
            details: error.message,
        });
    }
}


// Get user's cart
export async function getCart(req, res) {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // const user = await User.findById(userId).populate('shopping_cart.product');
        const AllCart = await cartProduct.find({userId})
        .populate('productId');

        // if (!user) {
        //     return res.status(404).json({ error: "User not found." });
        // }

        res.status(200).json({
            success : true,
            error : false,
            cart : AllCart
         });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the cart.", details: error.message });
    }
}
