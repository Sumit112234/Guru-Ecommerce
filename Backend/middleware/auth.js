import jwt from "jsonwebtoken";
import User from "../models/user.js";


const auth = async (req, res, next) => {
    const token = req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];
    try {
        
     
        if (!token) {
            return res.status(400).json({
                message: "No token found!",
                success: false,
                error: true,
                token,
                cookie : req.cookies
            });
        }
        
        // res.clearCookie('accessToken');
        // res.clearCookie('authToken');
        // res.clearCookie('refreshToken');
        // console.log("work done");
        


        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
      
        // console.log(decode);
        if(!decode)
        {
            return res.status(400).json({
                message: "Unauthorised Access.",
                success: false,
                error: true,
            });
        }
        // let user = await User.findOne({ _id : decode.userId});
        const user = await User.findById(decode.userId).populate('address_details').populate('orderHistory');
        
        req.user = user; 
        // console.log(user);
        // console.log("decode -> ", decode);
        
        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true,
            token : req.body,
           
        });
    }
};

export default auth;
