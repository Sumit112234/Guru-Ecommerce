import { Router } from 'express';
import { upload }  from "../middleware/multer.js";
import { addProduct ,getProduct ,getProductById , addMultipleProduct, deleteProduct, updateProduct ,addReview, createOrder,getUserOrders} from '../UtilitiFunctions/productHandler.js';
import auth from '../middleware/auth.js';

const productRouter = Router();



productRouter.post("/add-product", upload.array("images", 5), addProduct);
productRouter.post('/add-multiple-products', addMultipleProduct);

productRouter.get('/get-product', getProduct);
productRouter.get('/getProductById', getProductById);
productRouter.post('/delete-product/:id', deleteProduct);
productRouter.put('/update-product/:id', upload.array("images", 5), updateProduct);
productRouter.put('/add-review/:id', addReview);

productRouter.post('/add-orders',auth, createOrder);
productRouter.get('/get-orders/:userId',auth, getUserOrders);


export default productRouter;