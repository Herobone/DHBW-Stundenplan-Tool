"use client";
import {Drawer, IconButton} from "@mui/material";
import Navigation from "@/components/Navigation";
import React from "react";
import {Menu as MenuIcon} from "@mui/icons-material";
import {Portal} from "@mui/base";
import {Defaults} from "@/appDefaults";

export default function MobileNavDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
                sx={{display: {sm: 'none'}}}
            >
                <MenuIcon/>
            </IconButton>
            <Portal container={() => document.getElementById('navigation-drawer-anchor')!}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        width: Defaults.drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: Defaults.drawerWidth},
                    }}
                >
                    <Navigation isMobile/>
                </Drawer>
            </Portal>
        </>
    )
}
