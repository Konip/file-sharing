const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
require('dotenv').config()

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 1e8 // 1e6 - 1mb / 1e8 - 100mb
});

const PORT = process.env.PORT || 3000;

let id = ''

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

// app.get('/reciviver', (req, res) => {
//   res.sendFile(path.join(__dirname, '../', 'client/reciviver.html'));
// });

app.get('/t/:id', (req, res) => {
  console.log(req.params.id);

  if (req.params.id === id) {
    res.sendFile(path.join(__dirname, '../', 'client/reciviver.html'));
    io.emit('metadata')
  } else {
    res.status(404).send('хуй')
  }
});

app.use(express.static(path.join(__dirname, '../', 'client')))

io.on('connection', (socket) => {
  console.log(`connection ${socket.id}`);

  socket.on('download', () => {
    io.emit('send-file')
  })

  socket.on('file-sharing', arg => {
    socket.broadcast.emit('progress-bar')
    socket.broadcast.emit('send-chunk', arg)
  })

  socket.on('id', arg => {
    console.log(arg)
    id = arg
  })

  socket.on("disconnect", () => {
    console.log('disconnect');
  });

});

server.listen(PORT, () => console.log(`Start ${PORT}`));