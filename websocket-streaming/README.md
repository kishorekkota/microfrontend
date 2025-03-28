# WebSocket Streaming POC

This project is a proof of concept (POC) for streaming data from a server to a browser using WebSockets. It is built with React and TypeScript.

## Project Structure

```
websocket-streaming-poc
├── src
│   ├── App.tsx               # Main application component
│   ├── index.tsx             # Entry point of the application
│   ├── components
│   │   └── WebSocketStream.tsx # Component for handling WebSocket connections
│   ├── services
│   │   └── websocketService.ts  # Service for managing WebSocket connections
│   └── styles
│       └── App.css           # CSS styles for the application
├── public
│   ├── index.html            # Main HTML file
│   └── favicon.ico           # Favicon for the application
├── package.json              # NPM configuration file
├── tsconfig.json             # TypeScript configuration file
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd websocket-streaming-poc
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

The application establishes a WebSocket connection to a specified server and listens for incoming messages. The streamed data is displayed in real-time on the web page.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.