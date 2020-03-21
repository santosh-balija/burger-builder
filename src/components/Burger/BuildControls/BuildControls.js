import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Potato', type: 'potato'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Chicken', type: 'chicken'},

];



const buildControls = (props) => {
    const controlcomponent = controls.map( (controls,i) => { 
        return  <BuildControl 
                    key = {controls.label} 
                    label = {controls.label}
                    added = {() => props.add(controls.type)}
                    removed = {() => props.remove(controls.type)}
                    disabled = {props.disable[controls.type]}></BuildControl>
        }
    ) 
    return(
        <div className ={classes.BuildControls}>
            <p>Current Price:  <strong>{props.price.toFixed(2)}</strong></p>
            {controlcomponent}
            <button 
                className ={classes.OrderButton}
                disabled = {props.purchasable} 
                onClick = {props.ordered}>
                    ORDER NOW
            </button>
        </div>
        
    );
}
export default buildControls;