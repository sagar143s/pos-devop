// components/MainPage.js
"use client";

import React, { useState, useEffect } from "react";
import { Container, Stack, Paper, Typography, TextField, Button, Grid, IconButton, InputAdornment, FormControl, textFieldClasses } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const MainPage = ({ onLoginSuccess }) => {
  const [businessCode, setBusinessCode] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatPhoneNumber = (phone) => {
    if (phone.startsWith('971')) {
      return phone.replace(/^971(\d{2,})$/, '971-$1');
    }
    return phone;
  };

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value);
    setPhone(value);
    setFormattedPhone(formatted);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://app.devop.site/auth/business/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessCode,
          phone: formattedPhone, 
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Adjust this line based on your API response structure
  
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('authToken', token);
  
        console.log("Login successful!", data);
        onLoginSuccess();
  
        // Now, you can use this token for subsequent API requests by including it in the headers
      } else {
        console.log("Login failed", response.statusText);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  if (!isMounted) {
    return null;
  }

  return (
    <Container maxWidth={false} style={{ height: "100vh", padding: 0 }}>
      <Grid container spacing={0} style={{ height: "100vh" }}>
        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ flexGrow: 1, backgroundColor: "#f0f0f0" }}
          >
            <Paper
              elevation={6}
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" sx={{textAlign:'center'}} gutterBottom>
                Login 
              </Typography>
              <Stack component="form" spacing={2} noValidate autoComplete="off">
                <TextField
                  label="Business Code"
                  variant="outlined"
                  fullWidth
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                />
                
                <FormControl variant="outlined" fullWidth>
                  <PhoneInput
                    country={'ae'}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'phone',
                      id: 'phone-input',
                      required: true,
                    }}
                    containerStyle={{
                      width: '95%',
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '4px',
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      paddingLeft: '14px',
                      marginLeft:"20px",
                    }}
                  />
                </FormControl>

                <TextField
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  onClick={handleLogin}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{
              flexGrow: 1,
              background:
                "linear-gradient(to bottom right, #66CC99, #3A8DFF)",
              color: "#fff",
              textAlign: "center",
              padding: "24px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              New Here?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Sign up and discover a great amount of new opportunities!
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={() => {
                // Redirect to sign up page if needed
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
