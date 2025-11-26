import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


export const createRecord = async (req: Request, res: Response) => {  console.log(req.body) // Se hvad der postes til metoden
  res.send(`Funktion til at oprette en bil`); // Send besked til browseren
};


