import express from "express";
import {
  getMenus,
  getMenusById,
  createMenus,
  updateMenus,
  deleteMenus,
} from "../controllers/MenuController.js";

const router = express.Router();

router.get("/menu", getMenus);
router.get("/menu/:id", getMenusById);
router.post("/menu", createMenus);
router.patch("/menu/:id", updateMenus);
router.delete("/menu/:id", deleteMenus);

export default router;
