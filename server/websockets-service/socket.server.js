const HttpServer = require("http").Server;
const SocketIOServer = require("socket.io").Server;
const User = require("../src/models/userModel.js"); // Ensure path correctness
const OneToOneMessage = require("../src/models/messageModel.js"); // Ensure path correctness

function initializeSocketService(httpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // Adjust according to your needs
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("addUser", async (userId, userType) => {
      try {
        await User.findByIdAndUpdate(userId, { $set: { socket_id: socket.id, userType } });
        console.log(`User ${userId} added with Socket ID: ${socket.id}`);
      } catch (error) {
        console.error("Add User Error:", error);
      }
    });

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      try {
        const receiver = await User.findById(receiverId);
        if (receiver && receiver.socket_id) {
          io.to(receiver.socket_id).emit("receiveMessage", { senderId, text });
          
          await OneToOneMessage.create({
            participants: [senderId, receiverId],
            messages: [{
              from: senderId,
              to: receiverId,
              text: text,
              type: 'Text', // Adjust as needed
              created_at: new Date(),
            }]
          });
        }
      } catch (error) {
        console.error("Send Message Error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Additional logic to handle user disconnection, e.g., updating user status
    });
  });
}

module.exports = { initializeSocketService };



// import { Server as HttpServer } from "http";
// import { Server as SocketIOServer, Socket } from "socket.io";
// import User from "../src/models/userModel.js"; // Update paths as necessary
// import OneToOneMessage from "../src/models/messageModel.js"; // Update paths as necessary

// export function initializeSocketService(httpServer) {
//   const io = new SocketIOServer(httpServer, {
//     cors: {
//       origin: "*", // Adjust according to your needs
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on("addUser", async (userId, userType) => {
//       try {
//         await User.findByIdAndUpdate(userId, { $set: { socket_id: socket.id, userType } });
//         console.log(`User ${userId} added with Socket ID: ${socket.id}`);
//       } catch (error) {
//         console.error("Add User Error:", error);
//       }
//     });

//     socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
//       try {
//         const receiver = await User.findById(receiverId);
//         if (receiver && receiver.socket_id) {
//           io.to(receiver.socket_id).emit("receiveMessage", { senderId, text });
          
//           await OneToOneMessage.create({
//             participants: [senderId, receiverId],
//             messages: [{
//               from: senderId,
//               to: receiverId,
//               text: text,
//               type: 'Text', // Adjust as needed
//               created_at: new Date(),
//             }]
//           });
//         }
//       } catch (error) {
//         console.error("Send Message Error:", error);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//       // Additional logic to handle user disconnection, e.g., updating user status
//     });
//   });
// }



// // const socketIO = require("socket.io");
// // const http = require("http");
// // const express = require("express");
// // const cors = require("cors");
// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIO(server);

// // require("dotenv").config({
// //   path: "./.env",
// // });

// // app.use(cors());
// // app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.send("Hello world from socket server!test");
// // });

// // let users = [];

// // const addUser = (userId, socketId) => {
// //   !users.some((user) => user.userId === userId) &&
// //     users.push({ userId, socketId });
// // };

// // const removeUser = (socketId) => {
// //   users = users.filter((user) => user.socketId !== socketId);
// // };

// // const getUser = (receiverId) => {
// //   return users.find((user) => user.userId === receiverId);
// // };

// // // Define a message object with a seen property
// // const createMessage = ({ senderId, receiverId, text, images }) => ({
// //   senderId,
// //   receiverId,
// //   text,
// //   images,
// //   seen: false,
// // });

// // io.on("connection", (socket) => {
// //   // when connect
// //   console.log(`a user is connected`);

// //   // take userId and socketId from user
// //   socket.on("addUser", (userId) => {
// //     addUser(userId, socket.id);
// //     io.emit("getUsers", users);
// //   });

// //   // send and get message
// //   const messages = {}; // Object to track messages sent to each user

// //   socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
// //     const message = createMessage({ senderId, receiverId, text, images });

// //     const user = getUser(receiverId);

// //     // Store the messages in the `messages` object
// //     if (!messages[receiverId]) {
// //       messages[receiverId] = [message];
// //     } else {
// //       messages[receiverId].push(message);
// //     }

// //     // send the message to the recevier
// //     io.to(user?.socketId).emit("getMessage", message);
// //   });

// //   socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
// //     const user = getUser(senderId);

// //     // update the seen flag for the message
// //     if (messages[senderId]) {
// //       const message = messages[senderId].find(
// //         (message) =>
// //           message.receiverId === receiverId && message.id === messageId
// //       );
// //       if (message) {
// //         message.seen = true;

// //         // send a message seen event to the sender
// //         io.to(user?.socketId).emit("messageSeen", {
// //           senderId,
// //           receiverId,
// //           messageId,
// //         });
// //       }
// //     }
// //   });

// //   // update and get last message
// //   socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
// //     io.emit("getLastMessage", {
// //       lastMessage,
// //       lastMessagesId,
// //     });
// //   });

// //   //when disconnect
// //   socket.on("disconnect", () => {
// //     console.log(`a user disconnected!`);
// //     removeUser(socket.id);
// //     io.emit("getUsers", users);
// //   });
// // });

// // server.listen(process.env.PORT || 4000, () => {
// //   console.log(`server is running on port ${process.env.PORT || 4000}`);
// // });




// // import socketIO from "socket.io";
// // import http from "http";
// // import express, { Request, Response } from "express";
// // import cors from "cors";
// // import User from "../src/models/user.model";
// // const app = express();
// // const server = http.createServer(app);
// // const io = new socketIO.Server(server, {
// //   cors: {
// //     origin: "*",
// //   },
// // });

// // app.use(cors());
// // app.use(express.json());

// // app.get("/", (req: Request, res: Response) => {
// //   res.send("Hello world from socket server!");
// // });

// // interface User {
// //   userId: string;
// //   socketId: string;
// //   userType: 'genUser' | 'adminUser' | 'applicationAdminUser';
// // }

// // let users: User[] = [];

// // const addUser = (userId: string, socketId: string, userType: User['userType']) => {
// //   const existingUser = users.find((user) => user.userId === userId);
// //   if (!existingUser) {
// //     users.push({ userId, socketId, userType });
// //   }
// // };

// // const removeUser = (socketId: string) => {
// //   users = users.filter((user) => user.socketId !== socketId);
// // };

// // const getUser = (receiverId: string) => {
// //   return users.find((user) => user.userId === receiverId);
// // };

// // interface Message {
// //   id: string;  
// //   senderId: string;
// //   receiverId: string;
// //   text: string;
// //   images: string[];
// //   seen: boolean;
// // }

// // const createMessage = ({ id, senderId, receiverId, text, images }: Omit<Message, 'seen'>): Message => ({
// //   id,
// //   senderId,
// //   receiverId,
// //   text,
// //   images,
// //   seen: false,
// // });

// // io.on("connection", (socket) => {
// //   console.log(`a user is connected`);

// //   socket.on("addUser", (userId, userType) => {
// //     addUser(userId, socket.id, userType);
// //     io.emit("getUsers", users);
// //   });

// //   const messages: { [key: string]: Message[] } = {};

// //   socket.on("sendMessage", ({ id, senderId, receiverId, text, images }) => {
// //     const message = createMessage({ id, senderId, receiverId, text, images });
// //     const user = getUser(receiverId);
// //     if (user) {
// //       if (!messages[receiverId]) {
// //         messages[receiverId] = [message];
// //       } else {
// //         messages[receiverId].push(message);
// //       }
// //       io.to(user.socketId).emit("getMessage", message);
// //     }
// //   });

// //   socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
// //     const user = getUser(senderId);

// //     // update the seen flag for the message
// //     if (messages[senderId]) {
// //       const message = messages[senderId].find(
// //         (message) =>
// //           message.receiverId === receiverId && message.id === messageId
// //       );
// //       if (message) {
// //         message.seen = true;

// //         // send a message seen event to the sender
// //         io.to(user?.socketId).emit("messageSeen", {
// //           senderId,
// //           receiverId,
// //           messageId,
// //         });
// //       }
// //     }
// //   });

// //   // update and get last message
// //   socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
// //     io.emit("getLastMessage", {
// //       lastMessage,
// //       lastMessagesId,
// //     });
// //   });

// //   socket.on("disconnect", () => {
// //     console.log(`a user disconnected!`);
// //     removeUser(socket.id);
// //     io.emit("getUsers", users);
// //   });
// // });

// // const PORT = process.env.PORT || 4000;
// // server.listen(PORT, () => {
// //   console.log(`server is running on port ${PORT}`);
// // });


