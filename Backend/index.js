// Shree Ram

import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDb from './database/connectDB.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cart.js';
import adminRouter from './routes/admin.js';





const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL,'http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true   
 }));
const PORT = process.env.PORT || 9090;

app.get('/', (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        message : "Everything is okay.",
        error : "No error"
    })

})

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin', adminRouter);

// app.post('/data', (req,res)=>{

//     let {name , email,}
//     res.status(200).json({
//         message : "Everything is okay.",
//         error : "No error"
//     })

// })

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port : ", PORT);
    })
    
})

