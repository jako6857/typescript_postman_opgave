import express from 'express';
import dotenv from 'dotenv';
import carRoutes from './routes/carRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import { userRoutes } from './routes/userRoutes.js';

dotenv.config({ quiet: true });

const port = process.env.SERVERPORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
