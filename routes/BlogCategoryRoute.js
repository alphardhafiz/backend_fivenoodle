import express from "express";
import {
  getBlogCategory,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../controllers/BlogCategoryController.js";

const router = express.Router();

router.get("/blog-category", getBlogCategory);
router.get("/blog-category/:id", getBlogCategoryById);
router.post("/blog-category", createBlogCategory);
router.patch("/blog-category/:id", updateBlogCategory);
router.delete("/blog-category/:id", deleteBlogCategory);

export default router;
