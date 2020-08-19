import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/" exact>
                Burger Builder
            </NavItem>
            {props.isAuthenticated ? (
                <NavItem link="/orders">Orders</NavItem>
            ) : null}
            {!props.isAuthenticated ? (
                <NavItem link="/auth">Authinticate</NavItem>
            ) : (
                <NavItem link="/logout">LOG-OUT</NavItem>
            )}
        </ul>
    );
};

export default navItems;
