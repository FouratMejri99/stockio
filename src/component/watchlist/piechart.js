import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

// Sizing configuration
const sizing = {
  margin: { right: 5 },
  width: 600,
  height: 300,
  legend: { hidden: true },
};

export default function Dashboard() {
  const [sectorData, setSectorData] = useState([]);

  // Random data generation function
  const generateRandomData = () => {
    const sectors = [
      "Technology",
      "Healthcare",
      "Finance",
      "Consumer Goods",
      "Energy",
    ];
    const colors = ["#0000FF", "#FF0000", "green", "orange"]; // Blue, White, Red, Black

    const randomData = sectors.map((sector, index) => ({
      name: sector,
      percentage: Math.floor(Math.random() * 30) + 10, // Random percentage between 10 and 40
      color: colors[index % colors.length], // Assign color based on the sector index
    }));

    // Normalize the data so the percentages sum up to 100
    const total = randomData.reduce((sum, item) => sum + item.percentage, 0);
    const normalizedData = randomData.map((item) => ({
      ...item,
      percentage: (item.percentage / total) * 100,
    }));

    setSectorData(normalizedData);
  };

  useEffect(() => {
    // Generate random data when the component mounts
    generateRandomData();
  }, []); // Empty dependency array to run only once on mount

  const TOTAL = sectorData.reduce((sum, item) => sum + item.percentage, 0); // Calculate total percentage

  // Arc label to display percentage
  const getArcLabel = (params) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}%`;
  };

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      {/* Pie Chart for Random Sector Allocation */}
      {sectorData.length > 0 && (
        <PieChart
          series={[
            {
              outerRadius: 80,
              data: sectorData.map((sector) => ({
                label: sector.name,
                value: sector.percentage,
                color: sector.color,
              })),
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
      )}
    </div>
  );
}
