$(function () {
  const socket = io();

  socket.on('user connection', function(){
    $('#messages').append($('<li>').text('someone connected'));
  });

  socket.on('user disconnect', function(){
    $('#messages').append($('<li>').text('someone disconnected'));
  });

  socket.on('user count', function(num){
    $('#users').html(`users online ${num}`);
  });

  $('#set-name').on('click', function() {
    let name = $('#alias').val();

    $('#chat').html(name);
  });

  $('form').submit(function(e){
    e.preventDefault();
    let nickname = $('#chat').html();
    let message = $('#m').val();
    nickname === "" ? nickname = 'Anonymous User' :

    socket.emit('chat message', { message: message, nickname: nickname });
    $('#messages').append($('<li>').text(`${nickname}: ${message}`));
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(post){
    const { message, nickname } = post;
    $('#messages').append($('<li>').text(`${nickname}: ${message}`));
  });

});
