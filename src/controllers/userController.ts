import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

// GET ALL USERS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

// GET ONE USER
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

// CREATE USER
export const createRecord = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role, isActive } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // HASH PASSWORD HERE
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email,
        password: hashedPassword,
        role,
        isActive: Boolean(isActive),
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// UPDATE USER
export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { firstname, lastname, email, password, role, isActive } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const updateData: any = {
      firstname,
      lastname,
      email,
      role,
      isActive: Boolean(isActive),
    };

    // ONLY hash password if a new one is provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE USER
export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.user.delete({ where: { id } });
    return res.json({ message: `User with ID ${id} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
