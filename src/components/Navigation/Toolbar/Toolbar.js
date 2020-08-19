import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            {/* <div className={classes.Heading}>
                <h2>BURGER BUILDER</h2>
                <h4>by Piyush</h4>
            </div> */}
            <nav className={classes.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
};

export default toolbar;
