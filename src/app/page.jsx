"use client";
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Data for charts
const lineChartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
  datasets: [
    {
      label: "Total Revenue",
      data: [120, 90, 130, 110, 150, 170, 140, 160, 130, 180, 130, 160, 150, 170, 190],
      borderColor: "#3f51b5",
      backgroundColor: "rgba(63, 81, 181, 0.2)",
      fill: true,
    },
  ],
};

const visitorChartData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Visitors",
      data: [120, 180, 150, 300, 230, 260, 290],
      borderColor: "#3f51b5",
      backgroundColor: "rgba(63, 81, 181, 0.2)",
      fill: true,
    },
  ],
};

const orderTrackingData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Order Tracking",
      data: [50000, 70000, 60000, 90000],
      backgroundColor: "#3f51b5",
    },
  ],
};

const sellingPlatformData = {
  labels: ["Social Media", "Digital Ads", "Website"],
  datasets: [
    {
      label: "Selling Platform",
      data: [50, 30, 20],
      backgroundColor: ["#3f51b5", "#ff9800", "#f44336"],
    },
  ],
};

// Styles for components
const cardStyle = {
  padding: "16px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
};

const Dashboard = () => {
  return (
    <Box padding={2}>
      <Typography variant="h4" color={'#530966'} gutterBottom>
        Overview
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={2}>
        {["Total Income", "Total Sells", "Total User", "Total Transaction"].map((title, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper style={cardStyle}>
              <Typography >{title}</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                $169,853.00
              </Typography>
              <Typography variant="subtitle2" color={idx % 2 === 0 ? "green" : "red"}>
                {idx % 2 === 0 ? "+3.65%" : "-2.38%"} increase
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={8}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Total Revenue</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                $138,220
              </Typography>
              <Select defaultValue="Monthly">
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </Box>
            <div style={{ height: "340px" }}>
              <Line data={lineChartData} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Selling Platform</Typography>
            <div style={{ height: "410px" }}>
              <Doughnut data={sellingPlatformData} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} >
          <Paper style={cardStyle}>
            <Typography variant="h6">Order Tracking</Typography>
            <div style={{ height: "280px" }}>
              <Bar data={orderTrackingData} />
            </div>
          </Paper>
        </Grid>

       
        <Grid item xs={12} md={6}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Our Visitor</Typography>
            <div style={{ height: "280px" }}>
              <Line data={visitorChartData} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Location of Audience</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {[
                    { country: "United States", increase: "+4.35%" },
                    { country: "Canada", increase: "+3.49%" },
                    { country: "Italy", increase: "+4.63%" },
                    { country: "Denmark", increase: "+3.23%" },
                    { country: "France", increase: "+5.94%" },
                  ].map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>{item.increase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

       

        <Grid item xs={12} md={6}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Top Selling</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Sell</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Earnings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { no: 1, name: "Nutella", price: "$125", status: "Active", sell: "21500", view: "525K", earnings: "$52541" },
                    { no: 2, name: "Doritos", price: "$120", status: "Active", sell: "17600", view: "460K", earnings: "$46324" },
                    { no: 3, name: "Cheesy Chews", price: "$160", status: "Active", sell: "19800", view: "495K", earnings: "$49540" },
                    { no: 4, name: "White Pepper", price: "$175", status: "Inactive", sell: "12100", view: "310K", earnings: "$31025" },
                    { no: 5, name: "Ruffles", price: "$145", status: "Inactive", sell: "12300", view: "315K", earnings: "$31575" },
                  ].map((row) => (
                    <TableRow key={row.no}>
                      <TableCell>{row.no}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.sell}</TableCell>
                      <TableCell>{row.view}</TableCell>
                      <TableCell>{row.earnings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
