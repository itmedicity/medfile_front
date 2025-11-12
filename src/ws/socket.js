// @ts-nocheck
import { io } from "socket.io-client";

// const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:58888' : undefined;
const URL = process.env.NODE_ENV === 'development' ? '192.168.22.3:3000' : undefined;

export const socket = io(URL);