import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";


const router = Router();


router.route('/register').post(userRegister)
router.route('/login').post(userLogin);

//protected routes
router.route('/logout').post(verifyJwt, userLogout)



export default router