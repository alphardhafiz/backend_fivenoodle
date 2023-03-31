import express from "express";
import {
  getCategory,
  getCategoryById,
  createCategory,
  updateCateogry,
  deleteCategory,
} from "../controllers/MenuCategoryController.js";

const router = express.Router();

router.get("/category", getCategory);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.patch("/category/:id", updateCateogry);
router.delete("/category/:id", deleteCategory);

export default router;
