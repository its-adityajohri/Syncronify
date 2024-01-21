import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import webRoutes from './routes/web';
import authRoutes from './routes/auth';
import dbConnect from '../database/db';
import errorHandler from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', webRoutes);
app.use('./api/auth', authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnect();

export default app;