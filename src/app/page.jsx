"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Auto imports required components

// Sample data for the charts
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [4000, 3000, 5000, 4000, 6000, 7000],
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.2)",
      fill: true,
    },
  ],
};

const barChartData = {
  labels: ["Product A", "Product B", "Product C"],
  datasets: [
    {
      label: "Sales Volume",
      data: [300, 500, 200],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
    },
  ],
};

// Chart options
const chartOptions = {
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
      beginAtZero: true,
    },
  },
};

const Dashboard = () => {
  const [chartHeight, setChartHeight] = useState("300px");

  useEffect(() => {
    const getChartHeight = () => {
      return window.innerWidth < 600 ? "150px" : "300px";
    };

    setChartHeight(getChartHeight());

    const handleResize = () => {
      setChartHeight(getChartHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box padding={1} style={{ backgroundColor: "#fff" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #f3ec78, #af4261)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>
            <div style={{ height: chartHeight }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Revenue by Quarter
            </Typography>
            <div style={{ height: chartHeight }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={12}
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Product Sales
            </Typography>
            <div style={{ height: chartHeight }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Methods
            </Typography>
            <div style={{ height: chartHeight }}>
              {/* <Radar data={radarChartData} options={chartOptions} /> */}
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Box marginTop={3}>
        <Typography variant="h5" gutterBottom>
          Today's Orders
        </Typography>
        <Paper elevation={6} style={{ padding: "16px", backgroundColor: "#ffffff" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.products}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

// Example orders data
const orders = [
  {
    id: "001",
    customer: "John Doe",
    time: "10:00 AM",
    products: "Product A, Product B",
    price: "$120",
    payment: "Credit Card",
  },
  {
    id: "002",
    customer: "Jane Smith",
    time: "11:30 AM",
    products: "Product C",
    price: "$75",
    payment: "Cash",
  },
  {
    id: "003",
    customer: "Alice Johnson",
    time: "01:00 PM",
    products: "Product D, Product E",
    price: "$220",
    payment: "Credit Card",
  },
  {
    id: "004",
    customer: "Bob Brown",
    time: "03:15 PM",
    products: "Product F",
    price: "$150",
    payment: "Debit Card",
  },
  {
    id: "005",
    customer: "Charlie Davis",
    time: "04:45 PM",
    products: "Product G",
    price: "$95",
    payment: "Cash",
  },
];

export default Dashboard;
