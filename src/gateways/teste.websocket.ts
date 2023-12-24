import io from 'socket.io-client';

const socket = io('http://localhost:9000'); // Substitua com a URL do seu servidor

socket.on('connect', () => {
  console.log('Conectado ao servidor');
  socket.emit('your-message-event', { /* seus dados */ });
});

socket.on('response-event', (data) => {
  console.log('Dados recebidos:', data);
});
