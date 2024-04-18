// import dotenv from 'dotenv';
// import cors from 'cors';
// import express from 'express';
// import webRoutes from './routes/web';
// import authRoutes from './routes/auth';
// import dbConnect from '../database/db';
// import errorHandler from './middleware/errorHandler';

// dotenv.config();
// const app = express();
// app.use(cors());

// app.use(express.json());

// app.use('/health', (req, res) => res.status(200).send({message : 'Synchronify Http and Tcp-socket servers are running'}))
// app.use('/api', webRoutes);
// app.use('./api/auth', authRoutes);
// app.use(errorHandler);


// export default app;