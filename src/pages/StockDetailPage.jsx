import { Box, Container } from "@mui/material";
import { useState } from "react";
import BasicTable from "../component/table";

const Stocklist = () => {
  const [color, setColor] = useState("blue");

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
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
    </div>
  );
};

export default Stocklist;
