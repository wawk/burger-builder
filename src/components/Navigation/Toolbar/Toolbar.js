import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
      
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        <div className={classes.Logo}>
            <Logo/>
        </div>
    </header>



);


export default toolbar;