import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getABlog,
  getAllBlogs,
  getOwnBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/createBlog")
  .post(verifyJwt, upload.single("featuredImage"), createBlog);

router.route("/deleteBlog/:id").delete(verifyJwt, deleteBlog);

router
  .route("/updateBlog/:id")
  .put(verifyJwt, upload.single("featuredImage"), updateBlog
);

router.route("/getOwnBlogs").get(verifyJwt, getOwnBlogs);

router.route("/getAllBlogs").get(getAllBlogs);
router.route("/:id").get(getABlog);

export default router;
