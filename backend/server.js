import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', jobRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
