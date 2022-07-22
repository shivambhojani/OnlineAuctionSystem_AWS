import  React, {useContext} from "react";
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

export default function Header() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {logout} = useContext(AccountContext);

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

      const handlelogout = () => {
        setAnchorEl(null);
        
      };

    return (
        <AppBar position="static" style={{ background: '#6A5ACD' }}>
            <Toolbar>
                <IconButton
                    size="xtra-large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h4"
                    href="/"
                    component="div" sx={{
                        flexGrow: 1, fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                    }}>
                    AUCTPAD
                </Typography>
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
        </AppBar>
    );
}