import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js'


const verifyJwt = async (req, res, next) => {
    try {
        const incomingAccessToken = req.cookies.accessToken || req.header('Authorization')?.split(' ')[1];
        if(!incomingAccessToken){
            throw new Error('Access token not found')
        }
        console.log(incomingAccessToken);
    
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
        console.log(error);
    }
}

export default verifyJwt