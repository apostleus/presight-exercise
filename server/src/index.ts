import express from "express";
import usersRouter from "./routes/users.js";
import streamRouter from "./routes/stream.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/stream", streamRouter);
// app.use("/api/jobs", jobsRouter);

io.on("connection", (socket) => {
    console.log("client connected:", socket.id);
    socket.on("disconnect", () => console.log("client disconnected:", socket.id));
});

httpServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
