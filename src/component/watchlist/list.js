import { AddCircleOutline, DeleteOutline } from "@mui/icons-material"; // Add & Delete Icons
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the logged-in user's stocks
  useEffect(() => {
    const fetchUserStocks = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        alert("You need to be logged in to view your stocks.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/get-user-stocks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStocks(data.stocks); // Assuming the response contains a 'stocks' array
          setLoading(false);
        } else {
          alert("Failed to fetch stocks.");
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      }
    };

    fetchUserStocks();
  }, []);

  // Function to load stocks from localStorage
  const loadStocksFromLocalStorage = () => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  };

  // Function to add stock to localStorage
  const handleAddStock = (stockName) => {
    // Check if stock is already in the list
    let currentStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    const stockExists = currentStocks.find((stock) => stock.name === stockName);

    if (stockExists) {
      alert(`Stock ${stockName} is already added.`);
      return;
    }

    // Find the stock details by name
    const stockToAdd = stocks.find((stock) => stock.name === stockName);
    if (stockToAdd) {
      currentStocks.push(stockToAdd); // Add stock to the list
      localStorage.setItem("stocks", JSON.stringify(currentStocks)); // Save updated stocks to localStorage
      alert(`Stock ${stockName} added successfully.`);
      loadStocksFromLocalStorage(); // Reload stocks from localStorage
    }
  };

  // Function to handle delete (removes the stock from localStorage)
  const handleDeleteStock = (stockName) => {
    let currentStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    currentStocks = currentStocks.filter((stock) => stock.name !== stockName);
    localStorage.setItem("stocks", JSON.stringify(currentStocks)); // Save updated list
    loadStocksFromLocalStorage(); // Reload stocks after deletion
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Open Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.name}>
              <TableCell>
                <Typography variant="body1">{stock.name}</Typography>
              </TableCell>
              <TableCell>{stock.currentPrice}</TableCell>
              <TableCell>{stock.openPrice}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleAddStock(stock.name)}>
                  <AddCircleOutline color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteStock(stock.name)}>
                  <DeleteOutline color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockList;
