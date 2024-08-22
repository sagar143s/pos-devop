"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  const handleRegister = () => {
    // Handle registration logic here
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{ minHeight: "100vh" }}
    >
      {/* Registration Form */}
      <Box
        component={Paper}
        elevation={6}
        sx={{
          flex: 1,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Create an Account
        </Typography>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>

      {/* Login Prompt */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          color: "#fff",
        }}
      >
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Already Have an Account?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Login and continue your journey with us!
          </Typography>
          <Link href="/login" passHref>
            <Button
              variant="contained"
              color="secondary"
              component="a"
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};

export default RegisterPage;
