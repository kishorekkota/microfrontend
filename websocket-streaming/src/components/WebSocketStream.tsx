import React, { useEffect, useState } from 'react';
import { connectWS, disconnectWS, sendMessage } from '../services/websocketService';

const WebSocketStream: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const handleMessage = (message: string) => {
            console.log('Received message:', message); // Debug log for received messages
            setMessages(prevMessages => [...prevMessages, message]);
        };

        const connect = async () => {
            console.log('Attempting to connect to WebSocket...'); // Debug log for connection attempt
            const socket = await connectWS("wss://supreme-space-potato-q75xj74xj9jcv45-3000.app.github.dev",handleMessage);
            console.log('WebSocket connection established:', socket); // Debug log for successful connection
            setIsConnected(true);

            return () => {
                console.log('Disconnecting WebSocket...'); // Debug log for disconnection
                disconnectWS();
                setIsConnected(false);
            };
        };

        const cleanup = connect();

        return () => {
            cleanup.then(disconnect => {
                console.log('Cleaning up WebSocket connection...'); // Debug log for cleanup
                disconnect();
            });
        };
    }, []);

    const handleSendMessage = () => {
        if (isConnected) {
            console.log('Sending message: Hello Server!'); // Debug log for sending a message
            const message = JSON.stringify({ ticker: 'AAPL' }); // Properly formatted JSON
            sendMessage(message);
        } else {
            console.warn('Cannot send message: WebSocket is not connected'); // Debug log for failed send
        }
    };

    return (
        <div>
            <h1>WebSocket Stream</h1>
            <button onClick={handleSendMessage} disabled={!isConnected}>Send Message</button>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketStream;