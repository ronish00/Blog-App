import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js'


const verifyJwt = async (req, res, next) => {
    try {
        const incomingAccessToken = req.cookies.accessToken || req.header('Authorization')?.split(' ')[1];
        console.log("Error: ", req.cookies.accessToken);
        if(!incomingAccessToken){
            return res.status(404).json({message: "User is not logged in"})
        }
    
        const verifiedToken = await jwt.verify(
            incomingAccessToken,
            process.env.ACCESS_TOKEN_SECRET
        )
    
        if(!verifiedToken){
            throw new Error("Unauthorized access")
        }
    
        const user = await User.findById(verifiedToken._id).select("-password -refreshToken");
        req.user = user;
    
        next();
    } catch (error) {
        return res
        .status(500)
        .json({
            message: "Access token not found",
            error: error.message || 'Unknown error'
        })
    }
}

export default verifyJwt