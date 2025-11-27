import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const createRecord = async (req: Request, res: Response) => {
  const { model, year, price, fueltype, brandId, categoryId } = req.body;

  // Validation
  if (!model || !year || !price || !fueltype || !brandId || !categoryId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = await prisma.car.create({
      data: {
        model,
        year: Number(year),
        price: Number(price),
        fueltype,
        brandId: Number(brandId),
        categoryId: Number(categoryId),
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error creating car" });
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error fetching cars" });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const data = await prisma.car.findUnique({
      where: { id },
    });

    if (!data) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error fetching car" });
  }
};
