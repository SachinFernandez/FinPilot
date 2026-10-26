import "./App.css";
import {
  AccountBalanceWallet,
  Assessment,
  AutoGraph,
  Dashboard,
  ReceiptLong,
  Settings,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

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

const navigation = [
  { label: "Dashboard", icon: <Dashboard />, active: true },
  { label: "Transactions", icon: <ReceiptLong />, active: false },
  { label: "Budgets", icon: <AccountBalanceWallet />, active: false },
  { label: "Reports", icon: <Assessment />, active: false },
  { label: "Settings", icon: <Settings />, active: false },
];

const summaryCards = [
  {
    label: "Total Income",
    amount: 85000,
    icon: <TrendingUp />,
    color: "#60a5fa",
    note: "Money received this month",
  },
  {
    label: "Total Expenses",
    amount: 32500,
    icon: <TrendingDown />,
    color: "#f472b6",
    note: "Money spent this month",
  },
  {
    label: "Net Cash Flow",
    amount: 52500,
    icon: <AutoGraph />,
    color: "#34d399",
    note: "Income minus expenses",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-shell">
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
            {navigation.map((item) => (
              <ListItemButton
                key={item.label}
                selected={item.active}
                className="nav-item"
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Box className="sidebar-footer">
            <Typography variant="body2">Personal workspace</Typography>
            <Typography variant="caption" color="text.secondary">
              Your money, in focus.
            </Typography>
          </Box>
        </Box>

        <Box component="main" className="main-content">
          <Box className="topbar">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Personal Finance / Overview
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 750, mt: 0.5 }}
              >
                Financial overview
              </Typography>
            </Box>
            <Chip label="October 2026" color="primary" variant="outlined" />
          </Box>

          <Box className="welcome-section">
            <Typography variant="h4" sx={{ fontWeight:800 }}>
              Your finances, simplified.
            </Typography>
            <Typography color="text.secondary" sx={{ fontWeight: 750, mt: 1 }}>
              Understand your money and make your next move with confidence.
            </Typography>
          </Box>

          <Box className="section-heading">
            <Typography variant="h6" sx={{ fontWeight:700 }}>
              Monthly summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sample figures · October 2026
            </Typography>
          </Box>

          <Box className="summary-grid">
            {summaryCards.map((item) => (
              <Card className="summary-card" key={item.label}>
                <CardContent>
                  <Box className="card-title-row">
                    <Typography color="text.secondary" variant="body2">
                      {item.label}
                    </Typography>
                    <Box
                      className="card-icon"
                      sx={{ color: item.color }}
                    >
                      {item.icon}
                    </Box>
                  </Box>

                  <Typography variant="h4" sx={{fontWeight: 750, mt: 2}}>
                    {formatCurrency(item.amount)}
                  </Typography>

                  <Typography
                    variant="body2" sx={{ color:"text.secondary", mt: 1}}
                  >
                    {item.note}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box className="lower-grid">
            <Card className="panel-card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight:700 }}>
                  Savings snapshot
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                  How much of your income remains?
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, mt: 3 }}
                >
                  61.8%
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#34d399", mt: 1 }}
                >
                  {formatCurrency(52500)} remaining
                </Typography>

                <Box className="progress-track">
                  <Box className="progress-fill" />
                </Box>

                <Divider sx={{ my: 2.5, borderColor: "divider" }} />

                <Box className="detail-row">
                  <Typography color="text.secondary">
                    Income
                  </Typography>
                  <Typography>{formatCurrency(85000)}</Typography>
                </Box>
                <Box className="detail-row">
                  <Typography color="text.secondary">
                    Expenses
                  </Typography>
                  <Typography>{formatCurrency(32500)}</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card className="panel-card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight:700 }}>
                  Recent activity
                </Typography>
                <Typography sx={{ color: 'text.secondary', mt: 0.5}} variant="body2">
                  Example transactions
                </Typography>

                <Box className="activity-row">
                  <Box className="activity-icon income-icon">
                    <TrendingUp />
                  </Box>
                  <Box sx-={{ flex: 1}}>
                    <Typography sx={{ fontWeight:600 }}>Monthly salary</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Income · Oct 01
                    </Typography>
                  </Box>
                  <Typography color="#34d399" sx={{ fontWeight:700 }}>
                    +₹85,000
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "divider" }} />

                <Box className="activity-row">
                  <Box className="activity-icon expense-icon">
                    <ReceiptLong />
                  </Box>
                  <Box sx-={{ flex: 1}}>
                    <Typography sx={{ fontWeight:600 }}>Groceries</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Food · Oct 05
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight:700 }}>−₹2,450</Typography>
                </Box>

                <Divider sx={{ borderColor: "divider" }} />

                <Box className="activity-row">
                  <Box className="activity-icon expense-icon">
                    <ReceiptLong />
                  </Box>
                  <Box sx-={{ flex: 1}}>
                    <Typography sx={{ fontWeight:600 }}>Electricity bill</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Utilities · Oct 08
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight:700 }}>−₹1,800</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Typography className="footer-note">
            FinPilot · Personal finance workspace · All figures are illustrative
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
