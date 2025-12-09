import { Router } from "express";
import {
  getRatings,
  createRating,
  updateRating,
  deleteRating,
} from "../controllers/userRatingController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/", authenticateToken, getRatings);
router.post("/", authenticateToken, createRating);
router.put("/:id", authenticateToken, updateRating);
router.delete("/:id", authenticateToken, deleteRating);

export default router;
