
import { Box, Typography } from "@mui/material";

function Budgets() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 750 }}>
        Budgets
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Plan and monitor your monthly budgets.
      </Typography>
    </Box>
  );
}

export default Budgets;
