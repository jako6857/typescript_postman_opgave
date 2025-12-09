import { Router } from "express";
import {
  addGenreToPoster,
  deleteGenrePosterRel,
  getAllGenrePosterRels,
  updateSpecificGenrePosterRel,
} from "../controllers/genrePosterRelController";
import { authenticateToken,} from "../middleware/authenticateToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

router.get("/", getAllGenrePosterRels);
router.post("/", addGenreToPoster);
router.delete("/", authenticateToken, deleteGenrePosterRel);
router.put("/:id", updateSpecificGenrePosterRel);
    
export default router;
