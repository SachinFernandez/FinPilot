
import type { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface SummaryCardProps {
  label: string;
  amount: string;
  icon: ReactNode;
  color: string;
  note: string;
}

function SummaryCard({
  label,
  amount,
  icon,
  color,
  note,
}: SummaryCardProps) {
  return (
    <Card className="summary-card">
      <CardContent>
        <Box className="card-title-row">
          <Typography color="text.secondary" variant="body2">
            {label}
          </Typography>

          <Box className="card-icon" sx={{ color }}>
            {icon}
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 750, mt: 2 }}>
          {amount}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          {note}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
