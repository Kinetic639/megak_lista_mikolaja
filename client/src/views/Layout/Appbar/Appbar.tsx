import React from 'react';
import {AppBar, Typography, Toolbar} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    children: React.ReactNode,
    drawerWidth: number,
    handleDrawerToggle: () => void,
    mobileOpen: boolean
}

export const Appbar = (props: Props) => {
    return (
        <AppBar sx={{zIndex: props.mobileOpen ? (theme) => theme.zIndex.drawer : (theme) => theme.zIndex.drawer + 1 ,  }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {props.children}
                </Typography>
            </Toolbar>

        </AppBar>
    )
}
