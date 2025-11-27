import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// GET all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Kunne ikke hente categories" });
  }
};

// GET one category by ID
export const getCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id har ingen værdi" });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { cars: true },
    });

    if (!category) return res.status(404).json({ error: "Category ikke fundet" });

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Kunne ikke hente category" });
  }
};

// POST create category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const category = await prisma.category.create({ data: { name } });
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Kunne ikke oprette category" });
  }
};
