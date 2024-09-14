import { io } from 'socket.io-client';

export const AUTH_URL = 'https://yoaj50ivwc.execute-api.ap-south-1.amazonaws.com';
export const URL = 'https://yoaj50ivwc.execute-api.ap-south-1.amazonaws.com';
export const port = 8181;
export const version = 'v1';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const socket = io(`${URL}:9999`);
