"use client";
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Grid,
  FormControl, InputLabel, Select, MenuItem, IconButton, Snackbar, Alert, InputAdornment,
  Paper, Divider, FormControlLabel, Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PasswordIcon from '@mui/icons-material/Password';

const SettingsPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchDetails, setBranchDetails] = useState({ id: '', code: '', address: '' });
  const [staffs, setStaffs] = useState([]);
  const [newStaff, setNewStaff] = useState({ userId: '', password: '', employeeId: '', staffCard: '' });
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [role, setRole] = useState('Cashier');
  const [isActive, setIsActive] = useState(true);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
  };

  const handleBranchDetailsChange = (e) => {
    setBranchDetails({
      ...branchDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdateBranch = () => {
    if (branchDetails.id) {
      // Update existing branch
      setBranches(branches.map(branch =>
        branch.id === branchDetails.id ? branchDetails : branch
      ));
      setSnackbarMessage('Branch updated successfully');
    } else {
      // Add new branch
      setBranches([...branches, { ...branchDetails, id: branches.length + 1 }]);
      setSnackbarMessage('Branch added successfully');
    }
    setBranchDetails({ id: '', code: '', address: '' });
    setSnackbarOpen(true);
  };

  const handleEditBranch = (branch) => {
    setBranchDetails(branch);
  };

  const handleAddStaff = () => {
    if (selectedBranch) {
      setStaffs([...staffs, { ...newStaff, id: staffs.length + 1, branch: selectedBranch, role, isActive }]);
      setNewStaff({ userId: '', password: '', employeeId: '', staffCard: '' });
      setSnackbarMessage('Staff added successfully');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Please select a branch');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
    setSnackbarMessage('Branch deleted successfully');
    setSnackbarOpen(true);
  };

  const handleDeleteStaff = (id) => {
    setStaffs(staffs.filter(staff => staff.id !== id));
    setSnackbarMessage('Staff deleted successfully');
    setSnackbarOpen(true);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleActiveChange = (event) => {
    setIsActive(event.target.checked);
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      {/* Branch Management */}
      <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">Branch Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Branch Code"
                name="code"
                value={branchDetails.code}
                onChange={handleBranchDetailsChange}
                placeholder="Enter branch code"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Branch Address"
                name="address"
                value={branchDetails.address}
                onChange={handleBranchDetailsChange}
                placeholder="Enter branch address"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOrUpdateBranch}
                startIcon={<AddIcon />}
              >
                {branchDetails.id ? 'Update Branch' : 'Add Branch'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Existing Branches</Typography>
              <Grid container spacing={2}>
                {branches.map((branch) => (
                  <Grid item xs={12} md={6} key={branch.id}>
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      <Typography variant="body1">
                        {branch.code} - {branch.address}
                      </Typography>
                      <Box>
                        <IconButton onClick={() => handleEditBranch(branch)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteBranch(branch.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Staff Management */}
      <Accordion expanded={expanded === 'panel2'} onChange={handlePanelChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6">Staff Management for Branch: {selectedBranch || 'None'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Login Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="User ID"
                    name="userId"
                    value={newStaff.userId}
                    onChange={(e) => setNewStaff({ ...newStaff, userId: e.target.value })}
                    placeholder="Enter User ID"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    placeholder="Enter Password (6-digit passcode)"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    name="employeeId"
                    value={newStaff.employeeId}
                    onChange={(e) => setNewStaff({ ...newStaff, employeeId: e.target.value })}
                    placeholder="Enter Employee ID"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Staff Card"
                    name="staffCard"
                    value={newStaff.staffCard}
                    onChange={(e) => setNewStaff({ ...newStaff, staffCard: e.target.value })}
                    placeholder="Enter Staff Card Number"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="Cashier">Cashier</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch checked={isActive} onChange={handleActiveChange} color="primary" />
                }
                label="Active"
                sx={{ mt: 2 }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStaff}
              startIcon={<AddIcon />}
            >
              Add Staff
            </Button>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Staff List</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {staffs.map((staff) => (
                  <Grid item xs={12} key={staff.id}>
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: staff.isActive ? '#e6f7ff' : '#f9f9f9',
                      }}
                    >
                      <Box>
                        <Typography variant="body1">
                          {staff.userId} - {staff.role} - {staff.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Employee ID: {staff.employeeId}, Staff Card: {staff.staffCard}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => handleDeleteStaff(staff.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Admin Management */}
      <Accordion expanded={expanded === 'panel3'} onChange={handlePanelChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6">Admin Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Admin Name"
                name="name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                placeholder="Enter admin name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Admin Email"
                name="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Enter admin email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Admin Password"
                name="password"
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                placeholder="Enter admin password"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }]);
              setNewAdmin({ name: '', email: '', password: '' });
              setSnackbarMessage('Admin added successfully');
              setSnackbarOpen(true);
            }}
            startIcon={<AddIcon />}
            sx={{ mt: 3 }}
          >
            Add Admin
          </Button>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Admin List</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {admins.map((admin) => (
                <Grid item xs={12} key={admin.id}>
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Typography variant="body1">
                      {admin.name} - {admin.email}
                    </Typography>
                    <IconButton onClick={() => {
                      setAdmins(admins.filter(a => a.id !== admin.id));
                      setSnackbarMessage('Admin deleted successfully');
                      setSnackbarOpen(true);
                    }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
