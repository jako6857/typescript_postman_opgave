import { Request, Response } from "express";
import { prisma } from "../prisma";


// Add a genre to a poster (upsert to avoid duplicates)
export const addGenreToPoster = async (req: Request, res: Response) => {
  const { genreId, posterId } = req.body;

  // Validate inputs
  if (!genreId || !posterId) {
    return res.status(400).json({ error: "genreId and posterId are required" });
  }

  try {
    // Check if genre exists
    const genre = await prisma.genres.findUnique({ where: { id: Number(genreId) } });
    if (!genre) return res.status(400).json({ error: "Genre not found" });

    // Check if poster exists
    const poster = await prisma.posters.findUnique({ where: { id: Number(posterId) } });
    if (!poster) return res.status(400).json({ error: "Poster not found" });

    // Upsert relation (create if not exists)
    const rel = await prisma.genrePosterRel.upsert({
      where: {
        genreId_posterId: { genreId: Number(genreId), posterId: Number(posterId) }
      },
      create: { genreId: Number(genreId), posterId: Number(posterId) },
      update: {} // nothing to update, just ensure idempotent
    });

    res.status(201).json(rel);
  } catch (err: any) {
    console.error("Error adding genre to poster:", err);
    res.status(500).json({ error: "Failed to add genre to poster" });
  }
};

// Delete a genre-poster relation
export const deleteGenrePosterRel = async (req: Request, res: Response) => {
  // Try to get from body first, then fall back to query params
  let genreId = req.body.genreId || req.query.genreId;
  let posterId = req.body.posterId || req.query.posterId;

  console.log("Attempting to delete with genreId:", genreId, "posterId:", posterId);

  // Convert to numbers if they're strings
  genreId = Number(genreId);
  posterId = Number(posterId);

  if (!genreId || !posterId || isNaN(genreId) || isNaN(posterId)) {
    return res.status(400).json({ error: "genreId and posterId are required and must be numbers" });
  }

  try {
    const deleted = await prisma.genrePosterRel.delete({
      where: { 
        genreId_posterId: { genreId, posterId }
      }
    });

    console.log("Deleted relation:", deleted);
    res.status(204).send();
  } catch (err: any) {
    console.error("Error deleting genre-poster relation:", err.message, err.code);
    
    // If not found (Prisma error P2025)
    if (err.code === 'P2025') {
      return res.status(404).json({ error: `Relation not found for genreId: ${genreId}, posterId: ${posterId}` });
    }
    
    res.status(500).json({ error: "Failed to delete genre-poster relation", details: err.message });
  }
};

// Get all genre-poster relations
export const getAllGenrePosterRels = async (req: Request, res: Response) => {
  try {
    const rels = await prisma.genrePosterRel.findMany({
      include: {
        genres: true,
        posters: true
      }
    });
    res.json(rels);
  } catch (err: any) {
    console.error("Error fetching genre-poster relations:", err);
    res.status(500).json({ error: "Failed to fetch genre-poster relations" });
  }
};

export const updateSpecificGenrePosterRel = async (req: Request, res: Response) => {
  const { oldGenreId, oldPosterId, newGenreId, newPosterId } = req.body;
  
  if (!oldGenreId || !oldPosterId || !newGenreId || !newPosterId) {
    return res.status(400).json({ error: "oldGenreId, oldPosterId, newGenreId, and newPosterId are required" });
  }

  try {
    // Check if new genre and poster exist
    const newGenre = await prisma.genres.findUnique({ where: { id: Number(newGenreId) } });
    if (!newGenre) return res.status(400).json({ error: "New genre not found" });

    const newPoster = await prisma.posters.findUnique({ where: { id: Number(newPosterId) } });
    if (!newPoster) return res.status(400).json({ error: "New poster not found" });

    // Check if old relation exists
    const oldRel = await prisma.genrePosterRel.findUnique({
      where: { 
        genreId_posterId: { genreId: Number(oldGenreId), posterId: Number(oldPosterId) }
      }
    });

    if (!oldRel) {
      return res.status(404).json({ error: `Old relation not found for genreId: ${oldGenreId}, posterId: ${oldPosterId}` });
    }

    // Delete old relation
    await prisma.genrePosterRel.delete({
      where: { 
        genreId_posterId: { genreId: Number(oldGenreId), posterId: Number(oldPosterId) }
      }
    });

    // Create new relation
    const newRel = await prisma.genrePosterRel.create({
      data: { genreId: Number(newGenreId), posterId: Number(newPosterId) }
    });
    
    res.json(newRel);
  } catch (err: any) {
    console.error("Error updating genre-poster relation:", err.message, err.code);
    res.status(500).json({ error: "Failed to update genre-poster relation", details: err.message });
  }
};
