import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './Components/Authentication/Accounts';
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect, useState } from "react";

export default function Header() {
    const { getSession } = useContext(AccountContext);
    const [userId, setuserId] = useState();
    useEffect(() => {
      getSession().then((data) => {
        // console.log('Profile Session', data)
        setuserId(data['accessToken']['payload']['username']);
        console.log(data['accessToken']['payload']['username'])
      }).catch((err) => {
        console.log(err);
      });
    }, []);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {logout}  = useContext(AccountContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const Homepage = () => {
        setAnchorEl(null);
        navigate("/posts");
    };

    const myAccountClick = () => {
        setAnchorEl(null);
        navigate("/myaccount");
    };

    const addProduct = () => {
        navigate("/addproduct");
    };

    const productBought = () => {
        navigate("/productsbought");
    };

    const productsonSale = () => {
        navigate("/productsonsale");
    };

    const handlelogout = () => {
        setAnchorEl(null);

    };

    return (
        
        <>{String(userId).length > 1 ? 
        <AppBar position="static" style={{ background: '#6A5ACD' }}>
            <Toolbar>
               
                <Typography variant="h4"
                    href="/"
                    component="div" sx={{
                        flexGrow: 1, fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                    }}>
                    AUCTPAD
                </Typography>
                <MenuItem>
                    <Button color="inherit" onClick={addProduct}>
                        {" "}
                        <AddIcon />
                        Sell Product
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button color="inherit" onClick={productBought}>
                        {" "}
                        <ShoppingBagIcon />
                        Products Bought
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button color="inherit" onClick={productsonSale}>
                        {" "}
                        <ShoppingBagIcon />
                        My Sale
                    </Button>
                </MenuItem>

                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                    // onClose={handleClose}
                    >
                        <MenuItem onClick={Homepage}>HomePage</MenuItem>
                        <MenuItem onClick={myAccountClick}>My account</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar> : null}
        </>
    );
}