import { io } from 'socket.io-client';

// export const url ="http://mmProd-1434899310.ap-south-1.elb.amazonaws.com"
// export const url ="mmProd-1434899310.ap-south-1.elb.amazonaws.com"
export const url = "http://65.1.183.77"
export const port = 8181
export const version = "v1"

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const socket = io(`${url}:9999`);
