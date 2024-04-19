import { io } from 'socket.io-client';

// export const url ="http://mmProd-1434899310.ap-south-1.elb.amazonaws.com"
// export const url ="mmProd-1434899310.ap-south-1.elb.amazonaws.com"
export const url = 'http://192.168.1.14';
export const port = 8989;
export const version = 'v1';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const socket = io(`${url}:9999`);
