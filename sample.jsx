import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function OfferRejected({ onGoToMainMenu }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ minWidth: 400, maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Offer Rejected!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            Mail has been successfully sent to the Bank on Rejection of the Credit Card offer by the customer
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={onGoToMainMenu}
              sx={{ minWidth: 180 }}
            >
              Go to Main menu
            </Button>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 1,
          }}
        >
          <Box sx={{
            width: 40,
            height: 10,
            bgcolor: "orange",
            borderRadius: 2,
          }} />
          <Box sx={{
            width: 40,
            height: 10,
            bgcolor: "grey.500",
            borderRadius: 2,
          }} />
        </Box>
      </Card>
    </Box>
  );
}

export default OfferRejected;
