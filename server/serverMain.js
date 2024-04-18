const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const appMain = require('./src/appMain.js');
// const dbConnect = require('./database/db');
const { initializeSocketService } = require('./websockets-service/socket.server.js');

dotenv.config();

process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("UNCAUGHT Exception! Shutting down ...");
    process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
});

const httpServer = http.createServer(appMain);

const PORT = process.env.PORT || 8000;

initializeSocketService(httpServer);

const mongoose = require('mongoose'); // Make sure to require mongoose
const uri = process.env.DB_URI;

async function connectToDatabase() {
    try {
        if (uri) {
            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
        } else {
            throw new Error('DB_URI is undefined');
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err; // or handle it more gracefully
    }
}
connectToDatabase();

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// import dotenv from 'dotenv';
// import cors from 'cors';
// import http from 'http';
// import appMain from './src/appMain.js';
// // import dbConnect from './database/db';
// import { initializeSocketService } from './websockets-service/socket.server.js';

// dotenv.config();

// process.on("uncaughtException", (err) => {
//     console.log(err);
//     console.log("UNCAUGHT Exception! Shutting down ...");
//     process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
//   });

// const httpServer = http.createServer(appMain);

// const PORT = process.env.PORT || 8000;

// initializeSocketService(httpServer);

// const uri = process.env.DB_URI;

// async function connectToDatabase() {
//     try {
//         if (uri) {
//             await mongoose.connect(uri);
//             console.log('Connected to MongoDB');
//         } else {
//             throw new Error('DB_URI is undefined');
//         }
//         await mongoose.connect(uri);
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Error connecting to the database:');
//         throw err;
//     }
// }
// connectToDatabase();

// httpServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
