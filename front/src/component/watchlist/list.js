import { DeleteOutline } from "@mui/icons-material"; // Add & Delete Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); // Default rows per page
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

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page changes
  };

  // Function to load stocks from localStorage
  const loadStocksFromLocalStorage = () => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  };

  /// stock handling
  const handleAddStock = (stockId) => {
    try {
      let currentStocks = JSON.parse(localStorage.getItem("stocks")) || [];

      // Ensure uniqueness by checking stockId
      const stockExists = currentStocks.some((stock) => stock.id === stockId);

      if (stockExists) {
        console.warn(`Stock with ID ${stockId} is already added.`);
        return;
      }

      const stockToAdd = stocks.find((stock) => stock.id === stockId);

      if (stockToAdd) {
        currentStocks.push(stockToAdd);
        localStorage.setItem("stocks", JSON.stringify(currentStocks));
        console.log(`Stock with ID ${stockId} added successfully.`);
        loadStocksFromLocalStorage();
      }
    } catch (error) {
      console.error("Error handling stock addition:", error);
    }
  };

  // Function to handle delete (removes the stock from localStorage)
  const handleDeleteStock = (stockId) => {
    let currentStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    currentStocks = currentStocks.filter((stock) => stock.id !== stockId);
    localStorage.setItem("stocks", JSON.stringify(currentStocks));
    loadStocksFromLocalStorage();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper>
      <TableContainer>
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
            {stocks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>
                    <Typography variant="body1">{stock.name}</Typography>
                  </TableCell>
                  <TableCell>{stock.currentPrice}</TableCell>
                  <TableCell>{stock.openPrice}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleAddStock(stock.id)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStock(stock.id)}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={stocks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StockList;
