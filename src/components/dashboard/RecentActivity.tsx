
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import {
  ReceiptLong,
  TrendingUp,
} from "@mui/icons-material";

export interface Transaction {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface RecentActivityProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <Card className="panel-card">
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Recent activity
        </Typography>

        <Typography
          sx={{ color: "text.secondary", mt: 0.5 }}
          variant="body2"
        >
          Example transactions
        </Typography>

        {transactions.map((transaction, index) => (
          <Box key={transaction.id}>
            <Box className="activity-row">
              <Box
                className={`activity-icon ${
                  transaction.type === "income"
                    ? "income-icon"
                    : "expense-icon"
                }`}
              >
                {transaction.type === "income" ? (
                  <TrendingUp />
                ) : (
                  <ReceiptLong />
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {transaction.title}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {transaction.category} · {transaction.date}
                </Typography>
              </Box>

              <Typography
                sx={{ fontWeight: 700 }}
                color={
                  transaction.type === "income"
                    ? "#34d399"
                    : "text.primary"
                }
              >
                {transaction.type === "income" ? "+" : "−"}
                {formatCurrency(transaction.amount)}
              </Typography>
            </Box>

            {index < transactions.length - 1 && (
              <Divider sx={{ borderColor: "divider" }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
