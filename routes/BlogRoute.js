import express from "express";
import {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/BlogController.js";

const router = express.Router();

router.get("/blog", getBlog);
router.get("/blog/:id", getBlogById);
router.post("/blog", createBlog);
router.patch("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

export default router;
