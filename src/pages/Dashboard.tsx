import {
    AutoGraph,
    TrendingDown,
    TrendingUp,
} from "@mui/icons-material";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Typography,
} from "@mui/material";

import SummaryCard from "../components/dashboard/SummaryCard";
import RecentActivity, {
    type Transaction as ActivityTransaction,
} from "../components/dashboard/RecentActivity";
import { useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

function Dashboard() {

    const { transactions } = useTransactions();

    const currentDate = new Date();

    const currentMonth = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    const monthLabel = currentDate.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });

    const monthlyTransactions = useMemo(
        () =>
            transactions.filter((transaction) =>
                transaction.date.startsWith(currentMonth)
            ),
        [transactions, currentMonth]
    );

    const totalIncome = monthlyTransactions
        .filter((transaction) => transaction.type === "INCOME")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = monthlyTransactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const netCashFlow = totalIncome - totalExpenses;

    const savingsRate =
        totalIncome > 0
            ? (netCashFlow / totalIncome) * 100
            : null;

    const savingsRateDisplay =
        savingsRate !== null
            ? `${savingsRate.toFixed(1)}%`
            : "—";

    const isDeficit = netCashFlow < 0;

    const cashFlowLabel = isDeficit ? "deficit" : "remaining";

    const cashFlowColor = isDeficit
        ? "error.main"
        : "success.main";

    const progressWidth =
        savingsRate !== null
            ? Math.min(100, Math.max(0, savingsRate))
            : 0;

    const summaryCards = [
        {
            label: "Total Income",
            amount: totalIncome,
            icon: <TrendingUp />,
            color: "#60a5fa",
            note: "Money received this month",
        },
        {
            label: "Total Expenses",
            amount: totalExpenses,
            icon: <TrendingDown />,
            color: "#f472b6",
            note: "Money spent this month",
        },
        {
            label: "Net Cash Flow",
            amount: netCashFlow,
            icon: <AutoGraph />,
            color: "#34d399",
            note: "Income minus expenses",
        },
    ];

    const recentTransactions: ActivityTransaction[] = [...monthlyTransactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5)
        .map((transaction) => ({
            id: transaction.id,
            title: transaction.title,
            category: transaction.category,
            date: new Date(`${transaction.date}T00:00:00`).toLocaleDateString(
                "en-IN",
                { month: "short", day: "2-digit" }
            ),
            amount: transaction.amount,
            type: transaction.type === "INCOME" ? "income" : "expense",
        }));
    return (
        <>
            <Box className="topbar">
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Personal Finance / Overview
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 750, mt: 0.5 }}>
                        Financial overview
                    </Typography>
                </Box>

                <Chip label={monthLabel} color="primary" variant="outlined" />
            </Box>

            <Box className="welcome-section">
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    Your finances, simplified.
                </Typography>
                <Typography color="text.secondary" sx={{ fontWeight: 750, mt: 1 }}>
                    Understand your money and make your next move with confidence.
                </Typography>
            </Box>

            <Box className="section-heading">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Monthly summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Actual transactions · {monthLabel}
                </Typography>
            </Box>

            <Box className="summary-grid">
                {summaryCards.map((item) => (
                    <SummaryCard
                        key={item.label}
                        label={item.label}
                        amount={formatCurrency(item.amount)}
                        icon={item.icon}
                        color={item.color}
                        note={item.note}
                    />
                ))}
            </Box>

            <Box className="lower-grid">
                <Card className="panel-card">
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Savings snapshot
                        </Typography>

                        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                            How much of your income remains?
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 800, mt: 3 }}>
                            {savingsRateDisplay}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: cashFlowColor,
                                mt: 1,
                                fontWeight: 600,
                            }}
                        >
                            {formatCurrency(Math.abs(netCashFlow))} {cashFlowLabel}
                        </Typography>

                        <Box className="progress-track">
                            <Box
                                className="progress-fill"
                                sx={{
                                    width: `${progressWidth}%`,
                                }}
                            />
                        </Box>

                        <Divider sx={{ my: 2.5, borderColor: "divider" }} />

                        <Box className="detail-row">
                            <Typography color="text.secondary">Income</Typography>
                            <Typography>{formatCurrency(totalIncome)}</Typography>
                        </Box>

                        <Box className="detail-row">
                            <Typography color="text.secondary">Expenses</Typography>
                            <Typography>{formatCurrency(totalExpenses)}</Typography>
                        </Box>
                    </CardContent>
                </Card>

                <RecentActivity transactions={recentTransactions} />
            </Box>

            <Typography className="footer-note">
                FinPilot · Personal finance workspace · All figures are illustrative
            </Typography>
        </>
    );
}

export default Dashboard;
