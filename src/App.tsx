import React from "react";
import { CssBaseline, Container, ThemeProvider, Typography, createTheme, Stack } from "@mui/material";
import CounterCard from "./components/CounterCard";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            Mini Webapp
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Diese Seite nutzt die gleichen Komponenten wie Storybook – ideal zum End-to-End Verifizieren.
          </Typography>

          <CounterCard title="Zähler (Zustand Store)" />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
