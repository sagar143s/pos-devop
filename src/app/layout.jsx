"use client";
import './globals.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MainPage from '../app/login/page';
import LogoutWarningModal from '../components/LogoutWarningModal'; // Import the modal

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      startLogoutTimer();

      const resetTimer = () => {
        clearTimeout(logoutTimer);
        if (showLogoutWarning) {
          // If the warning is visible, don't reset the timer until the user responds
          return;
        }
        startLogoutTimer();
      };

      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keypress', resetTimer);

      return () => {
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
        clearTimeout(logoutTimer);
      };
    }
  }, [isLoggedIn, showLogoutWarning]);

  const startLogoutTimer = () => {
    const timer = setTimeout(() => {
      setShowLogoutWarning(true); // Show the warning popup after 1 minute
    }, 120000); // 1 minute = 60000 milliseconds

    setLogoutTimer(timer);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken'); // Remove the auth token as well
    clearTimeout(logoutTimer);
  };

  const handleCancelLogout = () => {
    setShowLogoutWarning(false); // Hide the popup
    startLogoutTimer(); // Restart the timer
  };

  return (
    <html lang="en">
      <body>
        {!isLoggedIn ? (
          <MainPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Layout onLogout={handleLogout}>{children}</Layout>
            <LogoutWarningModal
              open={showLogoutWarning}
              onCancel={handleCancelLogout}
              onLogout={handleLogout}
            />
          </>
        )}
      </body>
    </html>
  );
}
