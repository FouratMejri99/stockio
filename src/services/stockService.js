// src/services/stockService.js
import axios from "axios";

export const searchStock = async (symbol) => {
  const response = await axios.get(`/stocks/search?symbol=${symbol}`);
  return response.data;
};

export const getWatchlist = async (userId) => {
  const response = await axios.get(`/stocks/watchlist?userId=${userId}`);
  return response.data;
};
