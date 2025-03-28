const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Import streaming routes from a separate file
const streamRoutes = require('./routes/stock_ticker');

// Use the imported router on the /stream endpoint
app.use('/stream', streamRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Streaming app listening on port ${PORT}`);
});
