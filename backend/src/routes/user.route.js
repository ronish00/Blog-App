import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, refreshToken, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";


const router = Router();


router.route('/').post(verifyJwt, refreshToken);
router.route('/register').post(userRegister)
router.route('/login').post(userLogin);

//protected routes
router.route('/logout').post(verifyJwt, userLogout)
router.route('/getCurrentUser').get(verifyJwt, getCurrentUser)
router.route('/changePassword').post(verifyJwt, changeCurrentPassword)




export default router