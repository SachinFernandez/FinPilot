import "./App.css";

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#818cf8" },
    background: {
      default: "#0b1020",
      paper: "#141b2d",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 14 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
