"use client";
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import Coin from '../../public/images/coin.png';
import PropTypes from 'prop-types';

const Header = ({ onDrawerToggle, hideSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleCoinClick = () => {
    window.location.href = '/coin';
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: '#fff',
        color: 'red',
        boxShadow: 'none',
        borderBottom: '1px solid violet',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          POXSO POS
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!hideSearch && (
            <>
              <IconButton color="inherit" onClick={handleSearchClick} sx={{ mr: 2 }}>
                <SearchIcon />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'width 0.3s ease-in-out',
                  width: searchOpen ? '200px' : '0px',
                  overflow: 'hidden',
                  animation: searchOpen
                    ? 'expandSearch 0.3s ease-in-out forwards'
                    : 'collapseSearch 0.3s ease-in-out forwards',
                }}
              >
                <InputBase
                  placeholder="Search…"
                  sx={{
                    backgroundColor: '#f1f1f1',
                    padding: '0 8px',
                    borderRadius: 1,
                    width: '100%',
                  }}
                />
              </Box>
            </>
          )}
          <IconButton color="inherit" onClick={handleCoinClick}>
              <Image src={Coin} width={50} height={50}/>
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  hideSearch: PropTypes.bool, // Add this prop
};

Header.defaultProps = {
  hideSearch: false,
};

export default Header;
