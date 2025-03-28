const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

// List of sample stock tickers
const TICKERS = ['AAPL', 'GOOGL', 'AMZN', 'TSLA', 'MSFT'];

// Helper function to generate random stock data for a list of tickers
function generateStockData(tickers) {
  return tickers.map((ticker) => {
    const price = (Math.random() * 2000 + 50).toFixed(2);  // Random price between $50 and $2050
    const change = (Math.random() * 10 - 5).toFixed(2);    // Random change between -5 and +5
    const volume = Math.floor(Math.random() * 1000000);    // Random volume up to 1 million
    return {
      ticker,
      price,
      change,
      volume,
      timestamp: new Date().toISOString(),
    };
  });
}

// 1) SSE endpoint for streaming ALL stock data
router.get('/stream', (req, res) => {
  // Set necessary headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Immediately send an initial event to confirm the connection is open
  res.write(`data: Connection established\n\n`);

  // Send data every 2 seconds
  const interval = setInterval(() => {
    const stockData = generateStockData(TICKERS);
    // Convert data array to JSON, then send as SSE event
    res.write(`data: ${JSON.stringify(stockData)}\n\n`);
  }, 2000);

  // If the client closes the connection, stop sending events
  req.on('close', () => {
    clearInterval(interval);
  });
});

// 2) SSE endpoint for streaming data for a SPECIFIC ticker
router.get('/stream/:ticker', (req, res) => {
  const { ticker } = req.params;

  // Validate that the requested ticker is in our TICKERS array
  if (!TICKERS.includes(ticker)) {
    return res.status(404).send(`Ticker "${ticker}" not found.`);
  }

  // Set necessary headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Immediately send an event to confirm the connection
  res.write(`data: Connection established for ${ticker}\n\n`);

  // Send data every 2 seconds for the requested ticker
  const interval = setInterval(async () => {
    try {
      console.log(`Fetching data for ticker "${ticker}"...`);
      const stockData = await stockService.getQuote(ticker); // Await the asynchronous call
      res.write(`data: ${JSON.stringify(stockData)}\n\n`);   // Send the data as JSON
    } catch (err) {
      console.error(`Error fetching data for ticker "${ticker}":`, err.message);
      res.write(`data: Error fetching data for ticker "${ticker}"\n\n`);
    }
  }, 2000);

  // If the client closes the connection, stop sending events
  req.on('close', () => {
    clearInterval(interval);
  });
});

module.exports = router;
