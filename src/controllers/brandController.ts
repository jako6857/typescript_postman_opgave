import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// Create Brand
export const createBrand = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const brand = await prisma.brand.create({
      data: { name }
    });

    return res.status(201).json(brand);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error creating brand" });
  }
};

// Get all brands
export const getBrands = async (_req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany();
    return res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error fetching brands" });
  }
};

// Get brand by ID
export const getBrand = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const brand = await prisma.brand.findUnique({
      where: { id }
    });

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    return res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error fetching brand" });
  }
};
