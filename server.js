import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3001; // Render sets PORT automatically
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*', // allows other frontends to connect
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (msg) => {
    console.log('Received message:', msg);
    io.emit('message', msg); // broadcast to everyone
  });
});

httpServer.listen(PORT, () => {
  console.log('Server listening on ${PORT}');
});