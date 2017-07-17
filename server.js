
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  let userNumber = 0;
  io.emit('user connection', 'a user joined the chat.');
  userNumber++;
  io.emit('user count', userNumber);

  socket.on('chat message', function(post){
    socket.broadcast.emit('chat message', post);
  });

  socket.on('disconnect', () => {
    userNumber--;
    io.emit('user count', userNumber);
    io.emit('user disconnect', 'a user left the chat.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
