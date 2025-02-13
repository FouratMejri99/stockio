const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

const app = express();
const port = 3000;

// Sample in-memory watchlist
let watchlist = [];

// Function to scrape current stock data from Yahoo Finance
const scrapeStockData = async (symbol) => {
  try {
    const url = `https://finance.yahoo.com/quote/${symbol}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const price = $('fin-streamer[data-field="regularMarketPrice"]').text();
    const change = $('fin-streamer[data-field="regularMarketChange"]').text();
    const percentageChange = $(
      'fin-streamer[data-field="regularMarketChangePercent"]'
    ).text();

    return { price, change, percentageChange };
  } catch (error) {
    throw new Error("Failed to scrape stock data");
  }
};

// Function to scrape historical stock data (last 7 days)
const scrapeStockHistory = async (symbol) => {
  try {
    const url = `https://finance.yahoo.com/quote/${symbol}/history?p=${symbol}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let history = [];
    $('tr[data-test="historical-prices"]').each((i, element) => {
      const date = $(element).find("td:nth-child(1)").text();
      const closePrice = $(element).find("td:nth-child(5)").text();
      if (date && closePrice) {
        history.push({ date, closePrice });
      }
    });

    return history;
  } catch (error) {
    throw new Error("Failed to scrape stock history");
  }
};

// Routes

// Search stock and return current data
app.get("/stocks/search", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: "Stock symbol is required" });
  }

  try {
    const stockData = await scrapeStockData(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get historical stock data
app.get("/stocks/history", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: "Stock symbol is required" });
  }

  try {
    const history = await scrapeStockHistory(symbol);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Watchlist management (Add/Remove stocks)
app.get("/stocks/watchlist", (req, res) => {
  res.json({ watchlist });
});

app.post("/stocks/watchlist", express.json(), (req, res) => {
  const { symbol, action } = req.body;
  if (action === "add") {
    if (!watchlist.includes(symbol)) {
      watchlist.push(symbol);
    }
  } else if (action === "remove") {
    watchlist = watchlist.filter((stock) => stock !== symbol);
  }
  res.json({ watchlist });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Scheduled task to scrape stock data periodically (every 1 hour)
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled stock data update...");
  for (const symbol of watchlist) {
    try {
      const stockData = await scrapeStockData(symbol);
      console.log(`Updated data for ${symbol}: `, stockData);
    } catch (error) {
      console.error(`Error updating ${symbol}:`, error.message);
    }
  }
});
