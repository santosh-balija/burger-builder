import React from 'react';
import classes from './DrawerToogle.css';

const drawToggler = (props) => (
    <div className = {classes.DrawerToggle} onClick = {props.click}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawToggler;