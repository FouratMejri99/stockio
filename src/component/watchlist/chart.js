import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"; // Import ReactApexChart

export default function GridDemo() {
  const [stockData, setStockData] = useState([]);
  const [dataset, setDataset] = useState([]);

  // Function to load stocks from localStorage
  const loadStocksFromLocalStorage = () => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStockData(storedStocks);
  };

  // Function to transform stock data into a format suitable for ApexChart
  const transformStockData = () => {
    return stockData.map((stock, index) => ({
      name: stock.name,
      data: stock.currentPrice,
    }));
  };

  useEffect(() => {
    loadStocksFromLocalStorage();
  }, []); // Only runs once on mount

  useEffect(() => {
    if (stockData.length > 0) {
      const initialDataset = transformStockData();
      setDataset(initialDataset); // Set initial dataset
    }
  }, [stockData]); // Triggered whenever stockData changes

  // Simulate moving curve by updating the dataset every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setDataset((prevDataset) => {
        // Example: Add a new data point to simulate the curve movement
        const newDataset = prevDataset.map((dataPoint) => ({
          ...dataPoint,
          data: dataPoint.data + (Math.random() - 0.5) * 5, // Simulate fluctuation of stock price
        }));

        return newDataset;
      });
    }, 1000); // Update every 1 second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Only run once to simulate the curve movement

  const state = {
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "Traffic Sources",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001",
      ],
      yaxis: [
        {
          title: {
            text: "Website Blog",
          },
        },
        {
          opposite: true,
          title: {
            text: "Social Media",
          },
        },
      ],
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}
