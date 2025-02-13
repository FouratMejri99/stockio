const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const getStockPrice = async (ticker) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://finance.yahoo.com/quote/${ticker}`;

  try {
    await page.goto(url, { waitUntil: "networkidle" });

    const price = await page.$eval(
      'fin-streamer[data-field="regularMarketPrice"]',
      (el) => el.innerText
    );

    const currency = await page.$eval(
      'fin-streamer[data-field="currency"]',
      (el) => el.innerText
    );

    await browser.close();
    return { price, currency };
  } catch (error) {
    await browser.close();
    throw new Error("Failed to scrape stock price");
  }
};

app.get("/api/price/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const data = await getStockPrice(ticker);

    res.json({ ticker, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
