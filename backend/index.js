require("dotenv").config();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const PORT = process.env.SERVER_PORT;

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const chatRoutes = require("./routes/chat");
const setupSockets = require("./utils/socketManager");
const exp = require("constants");

const app = express();

// DB
// connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
  },
});

setupSockets(io);

app.get("/", (req, res) => {
  res.send("Server Up");
});

server.listen(PORT, () => {
  console.log(`Server up on port: ${PORT}`);
});
