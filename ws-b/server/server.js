const { createServer } = require('http');
const { Server } = require('socket.io'); 

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

socket.on('connection', (socket)=>{
  // console.log(socket);
  socket.on('message', (data)=>{
    console.log(data);
  })
  socket.emit('message', 'Hello');
});

httpServer.listen(3000, ()=>{
  console.log('Server is connected');
})