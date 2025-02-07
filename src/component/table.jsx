import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../context/notification";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]); // Store all data for search filtering
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { addNotification } = useNotificationContext();
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"];
  const API_KEY = "7GdKFlTbXDfZNUGIgDopgJ3pUT6xjQkl"; // Keep this secure!
  const date = "2025-02-05"; // Static for now, make it dynamic if needed

  // Fetch stock data from Polygon.io
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const responses = await Promise.allSettled(
          symbols.map(async (symbol) => {
            const url = `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error fetching ${symbol}`);
            return res.json();
          })
        );

        const formattedRows = responses
          .filter(
            (res) => res.status === "fulfilled" && res.value?.status === "OK"
          )
          .map((res, index) => ({
            name: symbols[index], // Correct key name
            currentPrice: res.value.close || "N/A",
            openPrice: res.value.open || "N/A",
            highPrice: res.value.high || "N/A",
            lowPrice: res.value.low || "N/A",
          }));

        setRows(formattedRows);
        setAllRows(formattedRows);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  const handleAddStock = async (stock) => {
    const userEmail = "test@example.com"; // Replace with logged-in user's email
    const token = localStorage.getItem("token")?.trim(); // Ensure it's retrieved correctly

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Properly formatted header
        },
        body: JSON.stringify({
          email: userEmail,
          stockData: stock,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        addNotification("Stock Added !");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock.");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    // Filter from allRows to avoid modifying the original state
    const filteredRows = allRows.filter((row) =>
      row.name.toLowerCase().includes(value)
    );

    setRows(filteredRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: 20 }}
      />
      <TableContainer component={Paper} elevation={10}>
        <Table sx={{ minWidth: 650 }} aria-label="stock data table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Open Price</TableCell>
              <TableCell align="right">High Price</TableCell>
              <TableCell align="right">Low Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.currentPrice}</TableCell>
                <TableCell align="right">{row.openPrice}</TableCell>
                <TableCell align="right">{row.highPrice}</TableCell>
                <TableCell align="right">{row.lowPrice}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleAddStock(row)}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
