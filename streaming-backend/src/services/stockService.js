const axios = require('axios');

class StockService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://finnhub.io/api/v1';
  }

  async getQuote(ticker) {
    try {
      const url = `${this.baseUrl}/quote?symbol=${ticker}&token=${this.apiKey}`;
      const response = await axios.get(url);
      const { c: currentPrice, d: change, dp: percentChange } = response.data;

      // Log the ticker and fetched data
      console.log(`Fetched quote for ${ticker}:`, { currentPrice, change, percentChange });

      return { currentPrice, change, percentChange };
    } catch (err) {
      console.error('Error fetching stock quote:', err.message);
      throw err;
    }
  }
}

module.exports = new StockService('');