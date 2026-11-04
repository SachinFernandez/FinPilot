
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export interface NavigationItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface SidebarProps {
  items: NavigationItem[];
}

function Sidebar({ items }: SidebarProps) {
  const location = useLocation();

  return (
    <Box component="aside" className="sidebar">
      <Box className="brand">
        <Box className="brand-mark">F</Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          FinPilot
        </Typography>
      </Box>

      <Typography className="nav-caption">
        WORKSPACE
      </Typography>

      <List className="navigation">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              selected={location.pathname === item.path}
              className="nav-item"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>

      <Box className="sidebar-footer">
        <Typography variant="body2">
          Personal workspace
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Your money, in focus.
        </Typography>
      </Box>
    </Box>
  );
}

export default Sidebar;
