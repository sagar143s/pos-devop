"use client";
import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, useMediaQuery, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Sample chart data for different time ranges
const salesData = {
  today: {
    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
    datasets: [
      {
        label: 'Sales Today',
        data: [100, 200, 150, 300, 250, 400],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true,
      },
    ],
  },
  week: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Sales This Week',
        data: [500, 600, 700, 800, 750, 900, 950],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true,
      },
    ],
  },
  month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales This Month',
        data: [2000, 2500, 2200, 2700],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true,
      },
    ],
  },
  year: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales This Year',
        data: [5000, 6000, 7000, 8000, 7500, 9000, 8500, 9500, 10000, 11000, 12000, 13000],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true,
      },
    ],
  },
};

// Sample data for the data table
const orders = [
  { orderId: '001', customer: 'John Doe', date: '2024-08-01', total: '$120.00' },
  { orderId: '002', customer: 'Jane Smith', date: '2024-08-02', total: '$150.00' },
  // Add more orders as needed
];

const ReportCard = ({ title, value, description, icon: IconComponent }) => (
  <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconComponent sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
      <Box>
        <Typography variant="h6" color="textSecondary">
          {title}
          {description && (
            <Tooltip title={description} sx={{color:'#b104de'}}>
              <IconButton size="small" sx={{ ml: 1 , color:"#b104de"}}>
                <InfoIcon fontSize="small"  />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        <Typography variant="h4"  sx={{ mt: 1, color:'#b104de' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today'); // State for selected time range

  // Responsive height based on screen size
  const isMobile = useMediaQuery('(max-width:600px)');
  const chartHeight = isMobile ? 250 : 450;

  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography  paragraph color="textSecondary">
        Analyze your point-of-sale data with key metrics and trends. Get insights into sales performance, customer behavior, and more.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={6}>
          <ReportCard
            title="Total Sales"
            value="$10,000"
            description="Total sales revenue for the current period."
            icon={AttachMoneyIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ReportCard
            title="Total Orders"
            value="150"
            description="Total number of orders processed."
            icon={ShoppingCartIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ReportCard
            title="Total Customers"
            value="75"
            description="Number of unique customers."
            icon={PeopleIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ReportCard
            title="Total Products"
            value="200"
            description="Total number of products available."
            icon={InventoryIcon}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Sales Trend
              </Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Time Range"
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ height: chartHeight, mt: 2 }}>
              <Line data={salesData[timeRange]} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
