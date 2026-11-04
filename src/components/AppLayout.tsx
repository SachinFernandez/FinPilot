
import {
  AccountBalanceWallet,
  Assessment,
  Dashboard,
  ReceiptLong,
  Settings,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar, { type NavigationItem } from "./Sidebar";

const navigation: NavigationItem[] = [
  { label: "Dashboard", icon: <Dashboard />, path: "/" },
  { label: "Transactions", icon: <ReceiptLong />, path: "/transactions" },
  { label: "Budgets", icon: <AccountBalanceWallet />, path: "/budgets" },
  { label: "Reports", icon: <Assessment />, path: "/reports" },
  { label: "Settings", icon: <Settings />, path: "/settings" },
];

function AppLayout() {
  return (
    <Box className="app-shell">
      <Sidebar items={navigation} />

      <Box component="main" className="main-content">
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
