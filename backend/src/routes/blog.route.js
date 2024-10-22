import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getOwnBlogs, updateBlog } from "../controllers/blog.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/createBlog").post(verifyJwt, createBlog);
router.route("/deleteBlog/:id").delete(verifyJwt, deleteBlog);
router.route("/updateBlog/:id").put(verifyJwt, updateBlog);
router.route("/getOwnBlogs").get(verifyJwt, getOwnBlogs);
router.route("/getAllBlogs").get(getAllBlogs);


export default router;