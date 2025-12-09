import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  const cart = await prisma.cartlines.findMany({
    where: { userId },
    include: { poster: true },
  });

  res.json(cart);
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { posterId, quantity } = req.body;

  const cartline = await prisma.cartlines.create({
    data: { userId, posterId, quantity },
  });

  res.status(201).json(cartline);
};

export const updateCartline = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  const updated = await prisma.cartlines.update({
    where: { id },
    data: { quantity },
  });

  res.json(updated);
};

export const deleteCartline = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  await prisma.cartlines.delete({ where: { id } });
  res.status(204).send();
};
