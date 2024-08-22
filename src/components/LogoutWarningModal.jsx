import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const LogoutWarningModal = ({ open, onCancel, onLogout }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Session Timeout</DialogTitle>
      <DialogContent>
        Your session is about to expire. Please choose to continue or logout.
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onCancel} 
          sx={{
            background: "#392253",
            color:"#fff",
            '&:hover': {
              background: "#4e2f75", // Slightly lighter shade for hover
            },
          }}
        >
          Continue Session
        </Button>
        <Button 
          onClick={onLogout} 
          sx={{
            background: "red",
            color:"#fff",
            '&:hover': {
              background: "#ff4d4d", // Lighter red for hover effect
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutWarningModal;
