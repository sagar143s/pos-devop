"use client";
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SalesIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportsIcon from '@mui/icons-material/Assessment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Sidebar = ({ open, onClose, drawerWidth, collapsed }) => {
  const [selectedPath, setSelectedPath] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleClick = (path) => {
    setSelectedPath(path);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: collapsed ? 56 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 56 : drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
          overflowX: 'hidden',
        },
        display: { xs: 'block', sm: 'block' }
      }}
    >
      <Box>
        <List>
          {[
            { path: '/dashboard', icon: <DashboardIcon /> },
            { path: '/products', icon: <AddShoppingCartIcon /> },
            { path: '/inventory', icon: <InventoryIcon /> },
            { path: '/sales_reports', icon: <ReportsIcon /> },
            { path: '/customers', icon: <PeopleAltIcon /> },
            { path: '/campaigns', icon: <CampaignIcon /> },
            { path: '/settings', icon: <SettingsIcon /> }
          ].map(({ path, icon }) => (
            <Link href={path} key={path} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                button
                selected={selectedPath === path}
                onClick={() => handleClick(path)}
                sx={{
                  '&.Mui-selected': {
                    borderLeft: '6px solid #571b66', 
                    borderRadius:'25px 0 0  25px',
                    marginLeft:'10px',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)', // Add box-shadow when selected
                    color: '#571b66', // Change text color when selected
                    '& .MuiListItemIcon-root': {
                      color: '#571b66', // Icon color when selected
                    },
                    '&:hover': {
                      backgroundColor: 'transparent', // Keep background transparent on hover
                    },
                  },
                  '&:hover': {
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)', // Slight shadow on hover
                    color: '#571b66',
                    '& .MuiListItemIcon-root': {
                      color: '#571b66', // Icon color on hover
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: selectedPath === path ? '#571b66' : 'inherit' }}>
                  {icon}
                </ListItemIcon>
                {!collapsed && !isSmallScreen && <ListItemText primary={path.replace('/', '') || 'Home'} />}
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
