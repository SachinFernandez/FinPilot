
import type { ReactNode } from "react";

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
}

interface SidebarProps {
    items: NavigationItem[];
    activeItem: string;
    onNavigate: (label: string) => void;
}

function Sidebar({ items, activeItem, onNavigate }: SidebarProps) {
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
                    <ListItemButton
                        key={item.label}
                        selected={activeItem === item.label}
                        onClick={() => onNavigate(item.label)}
                        className="nav-item"
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
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
