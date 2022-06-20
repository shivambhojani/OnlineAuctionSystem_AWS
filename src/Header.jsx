import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
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
                    component="div" sx={{ flexGrow: 1, fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
}}>
                    AUCTPAD
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}