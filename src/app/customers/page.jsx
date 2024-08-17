"use client";
import React, { useState } from 'react';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Box,
  Checkbox, IconButton, Button, TextField, Modal, Grid
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Sample data for customers
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, Springfield, USA',
    totalOrders: 15,
    totalSpent: '$1500.00',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '+1 987 654 321',
    address: '456 Elm St, Metropolis, USA',
    totalOrders: 10,
    totalSpent: '$1200.00',
  },
  // Add more customers as needed
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectCustomer = (id) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((customerId) => customerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCustomers(customers.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleDelete = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
    );
  };

  const handleBulkDelete = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => !selectedCustomers.includes(customer.id))
    );
    setSelectedCustomers([]);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
    customer.email.toLowerCase().includes(filterText.toLowerCase()) ||
    customer.phone.includes(filterText) ||
    customer.address.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    handleModalClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customers List
      </Typography>
      <Typography  paragraph color="textSecondary">
        Below is a list of customers who have made purchases from your store.
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          value={filterText}
          onChange={handleFilterChange}
          sx={{ width: '300px' }}
        />
        {selectedCustomers.length > 0 && (
          <Button
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            onClick={handleBulkDelete}
            sx={{
              background: "#571b66",
              borderRadius: "25px",
              border: '5px solid transparent',
              position: "relative",
              "&:hover": {
                background: "#fff",
                boxShadow:"none",
                color:"#571b66",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderTop: "5px solid #fff", // Hide top border
                  borderBottom: "5px solid #fff", // Hide bottom border
                  borderLeft: "5px solid #571b66", // Left border visible
                  borderRight: "5px solid #571b66", // Right border visible
                  borderRadius: "25px",
                  backgroundColor: "transparent",
                  boxShadow:"none"
                },
              },
            }}
          >
            Delete Selected
          </Button>
        )}
      </Box>
      <Paper sx={{ p: 0, boxShadow: 3, borderRadius: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedCustomers.length > 0 &&
                      selectedCustomers.length < customers.length
                    }
                    checked={
                      customers.length > 0 &&
                      selectedCustomers.length === customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total Orders</TableCell>
                <TableCell>Total Spent</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} selected={selectedCustomers.includes(customer.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(customer)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(customer.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ p: 3, mx: 'auto', mt: 5, maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Edit Customer
          </Typography>
          {editingCustomer && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={editingCustomer.address}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </Container>
  );
};


export default CustomerList;
