const express = require('express');
const cors = require('cors')
const app = express();
const http = require('http');
app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 4000;
const io = require("socket.io")(server);



app.get('/',cors(), (req, res) => {
    console.log("Yeah !!")
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.conn.id);

    socket.on('sendNickname', (username) => {
        socket.nickname = username;
        socket.emit('sendNickname', socket.conn.id);
    });

    socket.on('chat message', (msg) => {
        console.log(socket.nickname)
        socket.emit('chat message', msg, socket.conn.id, socket.nickname);
        socket.broadcast.emit('chat message', msg, socket.conn.id, socket.nickname);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.conn.id);
    });
});


server.listen(port, () => {
  console.log('listening on *:'+port);
});