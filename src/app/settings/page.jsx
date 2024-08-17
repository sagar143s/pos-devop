"use client";
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Grid,
  FormControl, InputLabel, Select, MenuItem, Switch, IconButton, InputAdornment
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SubscriptionIcon from '@mui/icons-material/CardMembership';
import PaletteIcon from '@mui/icons-material/Palette';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import DownloadIcon from '@mui/icons-material/Download';
import FormControlLabel from '@mui/material/FormControlLabel';


const countryOptions = [
  { code: 'US', name: 'United States', currency: 'USD', timeZones: ['PST', 'CST', 'EST'] },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', timeZones: ['GST'] },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', timeZones: ['GMT'] },
  // Add more countries as needed
];

const SettingsPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [posSettings, setPosSettings] = useState({
    receiptPrint: 'thermal',
    currency: 'AED',
  });

  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [currency, setCurrency] = useState('');
  const [subscription, setSubscription] = useState({
    plan: 'Basic',
    renewalDate: '2024-08-20',
    status: 'Active'
  });

  const [dashboardSettings, setDashboardSettings] = useState({
    theme: 'light',
    defaultView: 'summary',
    notificationsEnabled: true,
    dataExportFormat: 'CSV',
    language: 'English',
    userRoles: [],
  });

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePosChange = (e) => {
    setPosSettings({
      ...posSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selected = countryOptions.find(country => country.code === countryCode);
    setSelectedCountry(countryCode);
    setCurrency(selected?.currency || '');
    setTimeZone('');
  };

  const handleDashboardChange = (e) => {
    setDashboardSettings({
      ...dashboardSettings,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSave = () => {
    // Save settings logic
    console.log('POS Settings:', posSettings);
    console.log('Company Details:', companyDetails);
    console.log('Country:', selectedCountry);
    console.log('Time Zone:', timeZone);
    console.log('Currency:', currency);
    console.log('Subscription:', subscription);
    console.log('Dashboard Settings:', dashboardSettings);
  };

  const selectedCountryDetails = countryOptions.find(country => country.code === selectedCountry);

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      {/* POS Settings */}
      <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">POS Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Receipt Printer</InputLabel>
                <Select
                  name="receiptPrint"
                  value={posSettings.receiptPrint}
                  onChange={handlePosChange}
                  label="Receipt Printer"
                >
                  <MenuItem value="thermal">Thermal</MenuItem>
                  <MenuItem value="inkjet">Inkjet</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  value={posSettings.currency}
                  onChange={handlePosChange}
                  label="Currency"
                >
                  <MenuItem value="AED">AED</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

   
      {/* Country Settings */}
      <Accordion expanded={expanded === 'panel3'} onChange={handlePanelChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6">Country Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  label="Country"
                >
                  {countryOptions.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      <InputAdornment position="start">
                        <FlagIcon />
                      </InputAdornment>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {selectedCountry && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Time Zone</InputLabel>
                    <Select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      label="Time Zone"
                    >
                      {selectedCountryDetails.timeZones.map((zone) => (
                        <MenuItem key={zone} value={zone}>
                          <InputAdornment position="start">
                            <AccessTimeIcon />
                          </InputAdornment>
                          {zone}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      label="Currency"
                    >
                      <MenuItem value={selectedCountryDetails.currency}>
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                        {selectedCountryDetails.currency}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Company Details */}
      <Accordion expanded={expanded === 'panel4'} onChange={handlePanelChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography variant="h6">Company Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={companyDetails.name}
                onChange={handleCompanyChange}
                placeholder="Enter company name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Address"
                name="address"
                value={companyDetails.address}
                onChange={handleCompanyChange}
                placeholder="Enter company address"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={companyDetails.phone}
                onChange={handleCompanyChange}
                placeholder="Enter phone number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={companyDetails.email}
                onChange={handleCompanyChange}
                placeholder="Enter email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Subscription Plan */}
      <Accordion expanded={expanded === 'panel5'} onChange={handlePanelChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography variant="h6">Subscription Plan</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select
                  name="plan"
                  value={subscription.plan}
                  onChange={(e) => setSubscription({ ...subscription, plan: e.target.value })}
                  label="Plan"
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Renewal Date"
                name="renewalDate"
                value={subscription.renewalDate}
                onChange={(e) => setSubscription({ ...subscription, renewalDate: e.target.value })}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={subscription.status}
                  onChange={(e) => setSubscription({ ...subscription, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Dashboard Settings */}
      <Accordion expanded={expanded === 'panel6'} onChange={handlePanelChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <Typography variant="h6">Dashboard Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  name="theme"
                  value={dashboardSettings.theme}
                  onChange={handleDashboardChange}
                  label="Theme"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Default View</InputLabel>
                <Select
                  name="defaultView"
                  value={dashboardSettings.defaultView}
                  onChange={handleDashboardChange}
                  label="Default View"
                >
                  <MenuItem value="summary">Summary</MenuItem>
                  <MenuItem value="detailed">Detailed</MenuItem>
                  <MenuItem value="charts">Charts</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  name="language"
                  value={dashboardSettings.language}
                  onChange={handleDashboardChange}
                  label="Language"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Arabic">Arabic</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Data Export Format</InputLabel>
                <Select
                  name="dataExportFormat"
                  value={dashboardSettings.dataExportFormat}
                  onChange={handleDashboardChange}
                  label="Data Export Format"
                >
                  <MenuItem value="CSV">CSV</MenuItem>
                  <MenuItem value="PDF">PDF</MenuItem>
                  <MenuItem value="Excel">Excel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dashboardSettings.notificationsEnabled}
                    onChange={handleDashboardChange}
                    name="notificationsEnabled"
                  />
                }
                label="Enable Notifications"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
