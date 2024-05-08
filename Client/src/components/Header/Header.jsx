import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" className="bg-blue-500">
      <Toolbar className="justify-between">
        <Typography variant="h6" component="div" className="text-white">
          Admin Panel
        </Typography>
        <div className="flex items-center space-x-4">
         <Button component={NavLink} to="/Home/AddProducts" color="inherit" activeclassname="font-bold">
           AddProducts
          </Button>
          <Button component={NavLink} to="/Home/CustomerManagement" color="inherit" activeclassname="font-bold">
            Customer Management
          </Button>
          <Button component={NavLink} to="/Home" color="inherit" activeclassname="font-bold">
            Home
          </Button>
          <AccountCircle className="text-white" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
