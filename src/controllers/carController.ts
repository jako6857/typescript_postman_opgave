import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { category, brand, model, year, price, fueltype } = req.body;

    if (!category || !brand || !model || !year || !price || !fueltype) {
      return res.status(400).json({ error: 'Alle felter skal udfyldes' });
    }

    const data = await prisma.car.create({
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price: Number(price),
        fueltype
      }
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente data' });
  }
};
