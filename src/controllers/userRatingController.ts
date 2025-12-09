import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authenticateToken";

const prisma = new PrismaClient();

export const getRatings = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  const ratings = await prisma.userRatings.findMany({
    where: { userId },
    include: { poster: true },
  });

  res.json(ratings);
};

export const createRating = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { posterId, numStars } = req.body;

  const rating = await prisma.userRatings.create({
    data: { userId, posterId, numStars },
  });

  res.status(201).json(rating);
};

export const updateRating = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const { numStars } = req.body;

  const updated = await prisma.userRatings.update({
    where: { id },
    data: { numStars },
  });

  res.json(updated);
};

export const deleteRating = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  await prisma.userRatings.delete({ where: { id } });
  res.status(204).send();
};
