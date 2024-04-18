// import dotenv from 'dotenv';
// import cors from 'cors';
// import http from 'http';
// import app from './src/app';
// import dbConnect from './database/db';
// import { initializeSocketService } from './websockets-service/socket.server';

// dotenv.config();

// process.on("uncaughtException", (err) => {
//     console.log(err);
//     console.log("UNCAUGHT Exception! Shutting down ...");
//     process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
//   });

// const httpServer = http.createServer(app);

// const PORT = process.env.PORT || 8000;

// initializeSocketService(httpServer);

// dbConnect();

// httpServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
