// src/hooks/useStockData.js
import axios from "axios";
import { useEffect, useState } from "react";

const useStockData = (symbol) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/stocks/search?symbol=${symbol}`);
      setStockData(response.data);
    };
    fetchData();
  }, [symbol]);

  return stockData;
};

export default useStockData;
