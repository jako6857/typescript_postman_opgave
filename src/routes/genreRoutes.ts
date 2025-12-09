import { Router } from "express";
import {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";
import { authenticateToken } from "../middleware/authenticateToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

router.get("/", getGenres);
router.get("/:id", getGenre);

// ADMIN
router.post("/", authenticateToken, createGenre);
router.put("/:id", authenticateToken, updateGenre);
router.delete("/:id", authenticateToken, deleteGenre);

export default router;
