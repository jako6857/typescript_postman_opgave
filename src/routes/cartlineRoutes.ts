import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartline,
  deleteCartline,
} from "../controllers/cartlineController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

// USER must be logged in
router.get("/", authenticateToken, getCart);
router.post("/", authenticateToken, addToCart);
router.put("/:id", authenticateToken, updateCartline);
router.delete("/:id", authenticateToken, deleteCartline);

export default router;
