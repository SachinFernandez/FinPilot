
import { Box, Typography } from "@mui/material";

function Transactions() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 750 }}>
        Transactions
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        View and manage your income and expenses.
      </Typography>
    </Box>
  );
}

export default Transactions;
