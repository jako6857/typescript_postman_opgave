import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosters = async (req: Request, res: Response) => {
  const posters = await prisma.posters.findMany({
    include: {
      genres: { include: { genres: true } },
      userRatings: true,
    },
  });
  res.json(posters);
};

export const getPosterById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const poster = await prisma.posters.findUnique({
    where: { id },
    include: {
      genres: { include: { genres: true } },
      userRatings: true,
    },
  });
  if (!poster) return res.status(404).json({ message: "Poster not found" });
  res.json(poster);
};

export const createPoster = async (req: Request, res: Response) => {
  const data = req.body;

  const poster = await prisma.posters.create({ data });
  res.status(201).json(poster);
};

export const updatePoster = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;

  const poster = await prisma.posters.update({ where: { id }, data });
  res.json(poster);
};

export const deletePoster = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.posters.delete({ where: { id } });
  res.status(204).send();
};
