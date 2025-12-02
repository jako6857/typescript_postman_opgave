import { Router } from "express";
import { getBrands, getBrand, createBrand } from "../controllers/brandController.js";
import { deleteRecord } from "../controllers/brandController.js";

const router = Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", createBrand);
router.delete("/:id", deleteRecord);

export default router;
