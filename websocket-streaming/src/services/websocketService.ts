import { useEffect, useRef } from 'react';

let socket: WebSocket | null = null;

export const connectWS = (url: string, onMessage: (message: string) => void) => {
    socket = new WebSocket(url);

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        onMessage(event.data);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

export const disconnectWS = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
};

export const sendMessage = (message: string) => {
    console.log('Sending message:', message);
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.error('WebSocket is not open. Unable to send message:', message);
    }
};