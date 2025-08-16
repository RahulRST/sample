import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const OfferRejected = ({ onMainMenu }) => (
  <Box
    minHeight="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="#f5f7fa"
  >
    <Paper sx={{ px: 4, py: 6, borderRadius: 3, maxWidth: 450, textAlign: 'center', boxShadow: 4 }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h4" fontWeight={700} gutterBottom color="error.main">
        Offer Rejected!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Mail has been successfully sent to the bank<br />
        regarding rejection of the credit card offer by the customer.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onMainMenu}
        sx={{ borderRadius: 2, fontWeight: 600 }}
      >
        Go to Main Menu
      </Button>
    </Paper>
  </Box>
);

export default OfferRejected;
