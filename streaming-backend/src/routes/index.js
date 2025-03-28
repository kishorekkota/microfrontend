
const express = require('express');

const indexRouter = express.Router();

// A route that streams data using Server-Sent Events
indexRouter.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Immediately send an initial event to confirm the connection is open
  res.write(`data: Connection established\n\n`);

  let counter = 0;

  // Send data every 2 seconds
  const interval = setInterval(() => {
    counter += 1;
    const data = {
      timestamp: new Date().toISOString(),
      value: Math.floor(Math.random() * 1000),
      count: counter,
    };
    // Convert data object to JSON, then send an SSE event
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  // If the client closes the connection, stop sending events
  req.on('close', () => {
    clearInterval(interval);
  });
});

module.exports = indexRouter;