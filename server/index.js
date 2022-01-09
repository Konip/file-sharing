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

let link = ''

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

app.get('/t/:link', (req, res) => {
  console.log(req.params.link);
  if (req.params.link === link) {
    res.sendFile(path.join(__dirname, '../', 'client/reciviver.html'));
  } else {
    res.status(404).send('хуй')
  }
});

app.use(express.static(path.join(__dirname, '../', 'client')))

io.on('connection', (socket) => {
  console.log(`connection ${socket.id}`);

  socket.on('fs', arg => {
    // console.log(arg)
    socket.broadcast.emit('fs-send', arg)
  })

  socket.on('link', arg => {
    console.log(arg)
    link = arg

  })


  socket.on("disconnect", () => {
    console.log('disconnect');
  });

});

server.listen(PORT, () => console.log(`Start ${PORT}`));