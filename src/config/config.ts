import { io } from "socket.io-client";

export const url ="http://ec2-65-1-183-77.ap-south-1.compute.amazonaws.com"
// export const url ="http://192.168.77.28"
export const port = 8989
export const version = "v1"

export const headers = {
	Accept: "application/json",
	"Content-Type": "application/json"
};

export const socket = io(`${url}:9999`);