import { io } from 'socket.io-client';

export const AUTH_URL = 'https://j4d9fb5o15.execute-api.ap-south-1.amazonaws.com';
export const BASE_URL = 'https://d3be5gm8hnmvue.cloudfront.net';
// export const BASE_URL = 'http://192.168.194.155:9999';
export const CHAT_URL = 'https://yoaj50ivwc.execute-api.ap-south-1.amazonaws.com';
export const LOCALSOCKET = 'http://192.168.194.155:9999';
// export const port = 8181;
export const version = 'v1';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const socket = io(BASE_URL);

export const COUNTRY_ENV: 'IN' | 'BD' = 'IN';
