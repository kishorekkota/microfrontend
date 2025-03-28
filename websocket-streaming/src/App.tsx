import React from 'react';
import WebSocketStream from './components/WebSocketStream';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>WebSocket Streaming POC</h1>
            <WebSocketStream />
        </div>
    );
};

export default App;