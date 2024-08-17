"use client";
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  const drawerWidth = isSmallScreen ? 65 : 200;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResize = () => {
    setSidebarCollapsed(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header onDrawerToggle={handleDrawerToggle} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        drawerWidth={drawerWidth}
        collapsed={isSidebarCollapsed}
      />
      <main
        style={{
          marginLeft: isSidebarCollapsed ? 56 : drawerWidth,
          padding: '5px 0 0 0',
          flexGrow: 1,
          backgroundColor: '#ffff',
          marginTop: '64px',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
