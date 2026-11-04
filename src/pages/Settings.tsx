
import { Box, Typography } from "@mui/material";

function Settings() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 750 }}>
        Settings
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Manage your FinPilot preferences.
      </Typography>
    </Box>
  );
}

export default Settings;
