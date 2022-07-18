import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AreaChart from "./components/AreaChart";

function App() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <AreaChart />
      </Box>
    </Container>
  );
}

export default App;
