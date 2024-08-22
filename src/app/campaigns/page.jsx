"use client";
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton as MuiIconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Productimg from '../../../public/images/pro.png';
import Image from 'next/image';


// Sample data for existing campaigns
const initialCampaigns = [
  {
    id: 1,
    title: 'Summer Sale Campaign',
    type: 'Email',
    customers: 50,
    status: 'Active',
    image: Productimg, // Sample image path
  },
  {
    id: 2,
    title: 'New Product Launch',
    type: 'WhatsApp',
    customers: 100,
    status: 'Scheduled',
    image: Productimg, // Sample image path
  },
  // Add more campaigns as needed
];

// Sample data for customers
const customers = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
  // Add more customers as needed
];

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [campaignType, setCampaignType] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [campaignImage, setCampaignImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);

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

  const handleCampaignTypeChange = (event) => {
    setCampaignType(event.target.value);
  };

  const handleCreateCampaign = () => {
    const newCampaign = {
      id: campaigns.length + 1,
      title: campaignTitle,
      type: campaignType,
      customers: selectedCustomers.length,
      status: 'Draft',
      image: campaignImage || '/images/default-campaign.jpg', // Default image if none selected
    };
    setCampaigns([...campaigns, newCampaign]);
    handleCloseCreateDialog();
  };

  const handleUpdateCampaign = () => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === editingCampaignId
        ? {
            ...campaign,
            title: campaignTitle,
            type: campaignType,
            customers: selectedCustomers.length,
            image: campaignImage || '/images/default-campaign.jpg',
          }
        : campaign
    );
    setCampaigns(updatedCampaigns);
    handleCloseEditDialog();
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleOpenEditDialog = (campaign) => {
    setEditingCampaignId(campaign.id);
    setCampaignTitle(campaign.title);
    setCampaignType(campaign.type);
    setCampaignMessage(campaignMessage);
    setCampaignImage(campaign.image);
    setImagePreview(campaign.image);
    setSelectedCustomers([]); // Reset selected customers, handle this based on your requirement
    setOpenEditDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    // Clear form fields
    setCampaignTitle('');
    setCampaignType('');
    setCampaignMessage('');
    setCampaignImage('');
    setImagePreview('');
    setSelectedCustomers([]);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    // Clear form fields
    setCampaignTitle('');
    setCampaignType('');
    setCampaignMessage('');
    setCampaignImage('');
    setImagePreview('');
    setSelectedCustomers([]);
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.filter((campaign) => campaign.id !== id)
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCampaignImage(file.name); // Store file name or URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Campaign Management
      </Typography>

      {/* Button to Open Campaign Creation Dialog */}
      <Button
        variant="contained"
        color="primary"
        sx={{background:"violet"}}
        startIcon={<AddIcon />}
        onClick={handleOpenCreateDialog}
      >
        Create New Campaign
      </Button>

      {/* Existing Campaigns Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Existing Campaigns
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={4} lg={3} key={campaign.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={campaign.image}
                alt={campaign.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {campaign.title}
                </Typography>
                <Typography color="text.secondary">
                  Type: {campaign.type}
                </Typography>
                <Typography color="text.secondary">
                  Customers: {campaign.customers}
                </Typography>
                <Typography color="text.secondary">
                  Status: {campaign.status}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenEditDialog(campaign)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteCampaign(campaign.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Campaign Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Create a New Campaign
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseCreateDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Campaign Title"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Campaign Type</InputLabel>
                <Select
                  value={campaignType}
                  onChange={handleCampaignTypeChange}
                  label="Campaign Type"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Message"
                multiline
                rows={4}
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={campaignImage}
                onChange={(e) => setCampaignImage(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MuiIconButton
                        color="primary"
                        component="label"
                      >
                        <CloudUploadIcon />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </MuiIconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {imagePreview && (
                <Box
                  sx={{
                    mt: 2,
                    width: '100%',
                    height: '150px',
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Customers
              </Typography>
              <FormControlLabel
                control={
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
                }
                label="Select All"
              />
              <Box sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {customers.map((customer) => (
                  <Grid item xs={12} sm={6} key={customer.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                        />
                      }
                      label={`${customer.name} (${customer.email})`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCampaign}
          >
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Campaign
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEditDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Campaign Title"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Campaign Type</InputLabel>
                <Select
                  value={campaignType}
                  onChange={handleCampaignTypeChange}
                  label="Campaign Type"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Message"
                multiline
                rows={4}
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={campaignImage}
                onChange={(e) => setCampaignImage(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MuiIconButton
                        color="primary"
                        component="label"
                      >
                        <CloudUploadIcon />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </MuiIconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {imagePreview && (
                <Box
                  sx={{
                    mt: 2,
                    width: '100%',
                    height: '150px',
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Customers
              </Typography>
              <FormControlLabel
                control={
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
                }
                label="Select All"
              />
              <Box sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {customers.map((customer) => (
                  <Grid item xs={12} sm={6} key={customer.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                        />
                      }
                      label={`${customer.name} (${customer.email})`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateCampaign}
          >
            Update Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CampaignPage;
