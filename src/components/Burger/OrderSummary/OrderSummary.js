import React, {Component} from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';
const formatter = new Intl.NumberFormat('en-Us',{
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

class OrderSummary extends Component {
    
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                    </span>: {this.props.ingredients[igKey]}
                    </li>
        });

        return (
            <Aux>

            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{formatter.format(this.props.price.toFixed(2))}</strong></p>
    
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>

        {/* <Button 
        btnType = "Danger" 
        clicked = {this.props.purchaseCancelled}>
        CANCEL</Button>
    
                <Button
                btnType = "Success"
                clicked={this.props.purchaseContinued}
                >CONTINUE</Button> */}
                
        </Aux>

        );
    };
};

export default OrderSummary;