import io from 'socket.io-client';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import ApiEndPoint from 'utils/api';

const api = new ApiEndPoint();
const socketServer = api.getBasePath();

var socket = io(socketServer);

const configureSocket = () => {
  socket.on('connected', () => {});
  return socket;
};

export default configureSocket;
export { socket };
