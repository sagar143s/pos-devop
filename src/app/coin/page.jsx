"use client";
import React, { useState } from 'react';
import {
  Box, Typography, Button, Card, CardContent, TextField, Grid, Divider, InputAdornment
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import LockIcon from '@mui/icons-material/Lock';

const CoinBalancePage = () => {
  const [coinBalance, setCoinBalance] = useState(500); // Example balance
  const [topUpAmount, setTopUpAmount] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [cvv, setCvv] = useState('');

  const handleTopUp = () => {
    const additionalCoins = parseInt(topUpAmount) * 25; // Assuming 25 coins = 1 AED
    setCoinBalance(coinBalance + additionalCoins);
    setTopUpAmount('');
    setCreditCardNumber('');
    setExpiryDate('');
    setExpiryMonth('');
    setCvv('');
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 700, margin: 'auto' }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2' }}>
            Your Coin Balance
          </Typography>
          <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
            {coinBalance} Coins
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            Coins are a flexible currency within our platform. Each coin allows you to send a marketing campaign via Email, SMS, or WhatsApp. This ensures that your marketing efforts are streamlined and cost-effective.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            25 Coins = 1 AED
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Example: If you top up 100 AED, you will receive 2500 coins, which can be used for 2500 individual campaigns.
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Top Up Your Coins
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Enter amount in AED"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Credit Card Number"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Month"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Year"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleTopUp}
              >
                Top Up Now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CoinBalancePage;
