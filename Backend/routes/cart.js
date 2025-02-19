import { Router } from 'express';
import auth from '../middleware/auth.js';
// import upload from '../middleware/multer.js';
import { addToCart, getCart, removeFromCart, updateCart } from '../UtilitiFunctions/cartHandler.js';

const cartRouter = Router();



cartRouter.post('/addtocart', addToCart);
cartRouter.post('/removefromcart', removeFromCart);
cartRouter.post('/updatecart', updateCart);
cartRouter.get('/getCart', getCart);
// cartRouter.get('/finditems', auth,upload.single('avatar'), uploadAvator);

export default cartRouter;