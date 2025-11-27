import { Router } from "express";
import { getBrands, getBrand, createBrand } from "../controllers/brandController.js";

const router = Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", createBrand);

export default router;
