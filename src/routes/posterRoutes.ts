import { Router } from "express";
import {
  getAllPosters,
  getPosterById,
  createPoster,
  updatePoster,
  deletePoster,
} from "../controllers/posterController";
import { authenticateToken } from "../middleware/authenticateToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

router.get("/", getAllPosters);
router.get("/:id", getPosterById);

// ADMIN ONLY
router.post("/", authenticateToken, createPoster);
router.put("/:id", authenticateToken,  updatePoster);
router.delete("/:id", authenticateToken, deletePoster);

export default router;
