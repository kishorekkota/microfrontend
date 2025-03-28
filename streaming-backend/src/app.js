const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const stockService = require('./services/stockService'); // Import stock service
const stockRoutes = require('./routes/stock_ticker'); // Import your routes

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Middleware for Express routes
app.get('/', (req, res) => {
  res.send('WebSocket API is running!');
});

// Add route handling for stock data
app.use('/stream', stockRoutes); // Example route for stock-related endpoints

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Periodically send stock data to the client
  const interval = setInterval(async () => {
    try {
      // Fetch random stock data (or predefined tickers)
      const stockData = await stockService.getQuote('AAPL'); // Example ticker
      ws.send(JSON.stringify({ ticker: 'AAPL', stockData }));
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      ws.send(JSON.stringify({ error: 'Failed to fetch stock data.' }));
    }
  }, 5000); // Send data every 5 seconds

  // Handle incoming messages from the client
  ws.on('message', async (message) => {
    try {
      console.log('Received message from client:', message);

      // Parse the message to extract the stock ticker
      const { ticker } = JSON.parse(message);

      if (!ticker) {
        ws.send(JSON.stringify({ error: 'Ticker is required in the message.' }));
        return;
      }

      console.log(`Fetching stock data for ticker: ${ticker}`);

      // Fetch stock data using the stock service
      const stockData = await stockService.getQuote(ticker);

      // Send the stock data back to the client
      ws.send(JSON.stringify({ ticker, stockData }));
    } catch (error) {
      console.error('Error handling client message:', error.message);
      ws.send(JSON.stringify({ error: 'Failed to fetch stock data.' }));
    }
  });

  // Handle WebSocket disconnection
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    clearInterval(interval); // Stop sending data when the client disconnects
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});