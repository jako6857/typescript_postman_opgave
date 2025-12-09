import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await prisma.genres.findMany({
      include: {
        posters: { include: { posters: true } },
      },
    });
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
};

export const getGenre = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  try {
    const genre = await prisma.genres.findUnique({
      where: { id },
      include: { posters: { include: { posters: true } } },
    });

    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genre" });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  const { title, slug } = req.body;
  
  if (!title || !slug) {
    return res.status(400).json({ error: "Title and slug are required" });
  }
  
  try {
    const created = await prisma.genres.create({ 
      data: { title, slug }
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create genre" });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const updated = await prisma.genres.update({ where: { id }, data });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update genre" });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  
  try {
    await prisma.genres.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete genre" });
  }
};
