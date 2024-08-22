"use client";

import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, useMediaQuery, Divider, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

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

// Additional Charts Data
const categoryData = {
  labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Others'],
  datasets: [
    {
      label: 'Sales by Category',
      data: [3000, 2000, 1500, 1200, 800],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
};

const paymentData = {
  labels: ['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'],
  datasets: [
    {
      label: 'Sales by Payment Method',
      data: [5000, 3000, 1500, 1000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const customerSegmentData = {
  labels: ['New Customers', 'Returning Customers'],
  datasets: [
    {
      label: 'Customer Segmentation',
      data: [60, 40],
      backgroundColor: ['#FF6384', '#36A2EB'],
    },
  ],
};

// ReportCard Component
const ReportCard = ({ title, value, description, icon: IconComponent }) => (
  <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconComponent sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
      <Box>
        <Typography variant="h6" color="textSecondary">
          {title}
          {description && (
            <Tooltip title={description}>
              <IconButton size="small" sx={{ ml: 1, color: '#b104de' }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1, color: '#b104de' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

// Export functions
const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text('Sales Report', 20, 20);
  doc.autoTable({ html: '#ordersTable' });
  doc.save('sales_report.pdf');
};

const exportToCSV = () => {
  const csv = Papa.unparse(orders);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sales_report.csv');
  link.click();
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  const isMobile = useMediaQuery('(max-width:600px)');
  const chartHeight = isMobile ? 250 : 400;

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography paragraph color="textSecondary">
        Analyze your point-of-sale data with key metrics and trends. Get insights into sales performance, customer behavior, and more.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {/* Report Cards */}
        <Grid item xs={12} sm={6} lg={3}>
          <ReportCard
            title="Total Sales"
            value="$10,000"
            description="Total sales revenue for the current period."
            icon={AttachMoneyIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ReportCard
            title="Total Orders"
            value="150"
            description="Total number of orders processed."
            icon={ShoppingCartIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ReportCard
            title="Total Customers"
            value="75"
            description="Number of unique customers."
            icon={PeopleIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ReportCard
            title="Total Products"
            value="200"
            description="Total number of products available."
            icon={InventoryIcon}
          />
        </Grid>

        {/* Sales Trend Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Sales Trend</Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={timeRange} onChange={handleTimeRangeChange} label="Time Range">
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

        {/* Sales by Category Chart */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6">Sales by Category</Typography>
            <Box sx={{ height: chartHeight, mt: 2 }}>
              <Bar data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        {/* Sales by Payment Method Chart */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6">Sales by Payment Method</Typography>
            <Box sx={{ height: chartHeight, mt: 2 }}>
              <Doughnut data={paymentData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        {/* Customer Segmentation Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6">Customer Segmentation</Typography>
            <Box sx={{ height: chartHeight, mt: 2 }}>
              <Pie data={customerSegmentData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        {/* Orders Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <TableContainer component={Box} sx={{ mt: 2 }}>
              <Table id="ordersTable">
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
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="primary" onClick={exportToCSV} sx={{ mr: 2 }}>
                Export to CSV
              </Button>
              <Button variant="contained" color="primary" onClick={exportToPDF}>
                Export to PDF
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
