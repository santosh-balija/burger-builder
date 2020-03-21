import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawToggle click = {props.click}></DrawToggle>
        <Logo height = "80%"></Logo>
        <div className = {classes.DesktopOnly}>
            <NavigationItems/>
        </div>
        
    </header>
);

export default toolbar;