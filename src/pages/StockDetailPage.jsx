import { Box, Container } from "@mui/material";
import BasicTable from "../component/table";

const Stocklist = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        height: "100vh", // Full viewport height
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ marginLeft: "10px", width: "1500px", height: "500px" }}
      >
        <BasicTable />
      </Container>
    </Box>
  );
};

export default Stocklist;
