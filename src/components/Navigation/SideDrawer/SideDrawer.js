import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let assignedClasses = [classes.SideDrawer, classes.Close]
    if(props.show){
        assignedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Auxiliary>
            <Backdrop show = {props.show} clicked = {props.click}/>
            <div className = {assignedClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo/>
                    <nav>
                        <NavigationItems/>
                    </nav>
                </div>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;