import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function GridDemo() {
  const [historicalData, setHistoricalData] = useState([]);
  const [dates, setDates] = useState([]);
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-historical-data/AAPL'}`
      );

      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const prices = response.data.map((entry) => entry.close || 0);
        const labels = response.data.map((entry) => entry.date || "N/A");

        setHistoricalData(prices);
        setDates(labels);
      } else {
        console.error("Invalid data structure from API");
        setHistoricalData([]);
        setDates([]);
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setHistoricalData([]);
      setDates([]);
    }
  };

  useEffect(() => {
    fetchStockData("AAPL"); // Fetch Apple stock prices
  }, []);

  const state = {
    series: historicalData.length
      ? [{ name: "Stock Price", type: "line", data: historicalData }]
      : [{ name: "Stock Price", type: "line", data: [0] }],

    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [4],
      },
      title: {
        text: "",
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: dates.length ? dates : ["No Data"],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Price (USD)",
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        {historicalData.length > 0 ? (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
    </div>
  );
}
