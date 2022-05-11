import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import BugReportIcon from '@mui/icons-material/BugReport';
import {
    NavLink as RouterLink,
} from 'react-router-dom';
import {ListItemButton} from "@mui/material";
import {useLocation} from "react-router-dom"

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import './Drawer.scss'

const menuItems = [
    {
        desc: 'List',
        icon: <ChildCareIcon color="primary"/>,
        path: '/children',
    },
    {
        desc: 'Gifts',
        icon: <BedroomBabyIcon color="primary"/>,
        path: '/gifts',
    },
    {
        desc: 'Test',
        icon: <BugReportIcon color="primary"/>,
        path: '/test',
    }
];

interface Props {
    mobileOpen: boolean,
    handleDrawerToggle: ()=>void,
    width: number
}

export const PermanentDrawer = ( props: Props) => {
    const drawerWidth = props.width;
    const location = useLocation();
    interface customProps{
        to: string,
        primary: string,
        children: React.ReactNode
    }


    const CustomListItem = ({to, primary, children}: customProps) => (
        <ListItemButton
            component={RouterLink}
            to={to}
            selected={to === location.pathname}
        >
            {children}
            <ListItemText primary={primary} sx={{paddingLeft: 2}}></ListItemText>
        </ListItemButton>
    )

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {menuItems.map((item, index) => (
                    <CustomListItem to={item.path} key={item.desc} primary={item.desc}>
                        {item.icon}
                    </CustomListItem>
                ))}
            </List>
            <Divider/>
        </div>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}


