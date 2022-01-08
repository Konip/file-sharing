const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 1e8 // 1e6 - 1mb / 1e8 - 100mb
});
const PORT = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

app.get('/reciviver', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/reciviver.html'));
});

app.use(express.static(path.join(__dirname, '../', 'client')))

io.on('connection', (socket) => {
  console.log(`connection ${socket.id}`);

  socket.on('fs', arg => {
    // console.log(arg)

    socket.broadcast.emit('fs-send', arg)
  })

  socket.on("disconnect", () => {
    console.log('disconnect');
  });

});

server.listen(PORT, () => console.log(`Start ${PORT}`));