const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
import storage,{ _STORAGE, API_HOST } from './storage'

const socket = io(API_HOST);
const socketClient = feathers()
    .configure(socketio(socket));


socketClient.service('users')
  .on('created', user => console.log('New user created', user));
  
  
export default socketClient;  

