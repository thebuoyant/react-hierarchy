import React, { useEffect } from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ReactHierarchy from "./components/react-hierarchy/ReactHierarchy";
import { useDataStore } from "./store/dataStore";
import { MOCK_DATA } from "./_mock/mock-data";
import { APP_CONFIG } from "./app.config";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  const setData = useDataStore((s) => s.setData);

  useEffect(() => {
    setData(MOCK_DATA);
  }, [setData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ReactHierarchy appConfig={APP_CONFIG} />
      </Container>
    </ThemeProvider>
  );
}
