const connectedUsers = new Set();
const chatHistory = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (!connectedUsers.has(socket.id)) {
      connectedUsers.add(socket.id);
      console.log(`User Connected: ${socket.id}`);
    }

    socket.emit("chat_history", chatHistory);

    socket.on("send_message", (data) => {
      chatHistory.push(data);
      io.emit("chat_history", chatHistory);
    });

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.id);
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};
