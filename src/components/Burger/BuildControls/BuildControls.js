import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat',  type: 'meat'},

];

const formatter = new Intl.NumberFormat('en-Us',{
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const buildControls = (props) => (
    <div className={classes.BuildControls}>
              <p>Current Price: <strong>{formatter.format(props.price.toFixed(2))}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added ={() => props.ingredientAdded(ctrl.type)}
            removed = {() => props.ingredientRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}>ORDER NOW</button>

    </div>


);

export default buildControls;