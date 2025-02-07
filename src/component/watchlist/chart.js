import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

export default function GridDemo() {
  const [stockData, setStockData] = useState([]);
  const [dataset, setDataset] = useState([]);

  // Function to load stocks from localStorage
  const loadStocksFromLocalStorage = () => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStockData(storedStocks);
  };

  // Function to transform stock data into a format suitable for LineChart
  const transformStockData = () => {
    return stockData.map((stock, index) => ({
      x: stock.name,
      y: stock.currentPrice, // Using currentPrice as y
    }));
  };

  useEffect(() => {
    loadStocksFromLocalStorage();
  }, []);

  useEffect(() => {
    if (stockData.length > 0) {
      const initialDataset = transformStockData();
      setDataset(initialDataset);
    }
  }, [stockData]);

  // Simulate moving curve by updating the dataset every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setDataset((prevDataset) => {
        // Example: Add a new data point to simulate the curve movement
        const newDataset = prevDataset.map((dataPoint) => ({
          ...dataPoint,
          y: dataPoint.y + (Math.random() - 0.5) * 5, // Simulate fluctuation of stock price
        }));

        return newDataset;
      });
    }, 1000); // Update every 1 second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: "x" }]}
      series={[{ dataKey: "y" }]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
