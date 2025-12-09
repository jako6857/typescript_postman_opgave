import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { loginRoutes } from './routes/loginRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import posterRoutes from "./routes/posterRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import genrePosterRelRoutes from "./routes/genrePosterRelRoutes.js";
import cartlineRoutes from "./routes/cartlineRoutes.js";
import userRatingRoutes from "./routes/userRatingRoutes.js";


dotenv.config({ quiet: true });

const port = process.env.SERVERPORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/login', loginRoutes);
app.use('/api/authenticate', authRoutes);
app.use('/api/authorizeRole', authRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/genre-posters", genrePosterRelRoutes);
app.use("/api/cart", cartlineRoutes);
app.use("/api/ratings", userRatingRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
