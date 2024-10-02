import { io } from 'socket.io-client';

export const AUTH_URL = 'https://j4d9fb5o15.execute-api.ap-south-1.amazonaws.com';
export const BASE_URL = 'http://192.168.141.155:8989';
export const CHAT_URL = 'https://yoaj50ivwc.execute-api.ap-south-1.amazonaws.com';
export const LOCALSOCKET = 'http://192.168.141.155:9999';
export const LOCALSERVER = 'http://192.168.141.155:8989';
// export const port = 8181;
export const version = 'v1';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const socket = io(BASE_URL);
