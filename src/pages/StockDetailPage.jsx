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
        marginLeft: "18px",
        width: "500px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ marginLeft: "30px", width: "1500px", height: "500px" }}
      >
        <BasicTable />
      </Container>
    </Box>
  );
};

export default Stocklist;
