import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const API_KEY = "7GdKFlTbXDfZNUGIgDopgJ3pUT6xjQkl";

const sizing = {
  margin: { right: 5 },
  width: 600,
  height: 300,
  legend: { hidden: true },
};

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState([
    dayjs("2023-01-09"),
    dayjs("2023-02-10"),
  ]); // Default range
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedRange[0] || !selectedRange[1]) return;

    const formattedStartDate = selectedRange[0].format("YYYY-MM-DD");
    const formattedEndDate = selectedRange[1].format("YYYY-MM-DD");
    const API_URL = `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${formattedStartDate}/${formattedEndDate}?adjusted=true&sort=asc&apiKey=${API_KEY}`;

    axios
      .get(API_URL)
      .then((response) => {
        const results = response.data.results;
        if (results) {
          const formattedData = results.map((item, index) => ({
            label: `Volume ${index + 1}`,
            value: item.v,
            color: "#0088FE",
          }));

          setData(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedRange]);

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}%`;
  };

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      {/* Date Range Picker */}

      {/* Pie Chart */}
      <PieChart
        series={[
          {
            outerRadius: 80,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 15,
            display: "flex",
            justifyContent: "center",
          },
        }}
        {...sizing}
      />
    </div>
  );
}
