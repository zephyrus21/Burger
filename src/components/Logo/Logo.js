import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png';
const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="Logo" />
        </div>
    );
};

export default logo;
