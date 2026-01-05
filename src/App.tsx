import React from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ReactHierarchy from "./components/react-hierarchy/ReactHierarchy";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ReactHierarchy />
      </Container>
    </ThemeProvider>
  );
}
