import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    loading: false

}


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
         
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }
    componentDidMount()  {
        axiosInstance.get('/Ingredients.json')
        .then(response =>{
            
            this.setState({ingredients: response.data});
            this.setState({error: null})
        })

            .catch( error => {
                this.setState( { error: true } );
            } );
            
        
    
    };
    updatePurchaseState = (ingredients) => {

        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el)=> {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});

    };

    addingredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, 
    
            ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);


    };

    purchaseHandler = () => {
        this.setState({purchasing: true});

    };

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});

    };

    purchaseContinueHandler = () => {
        // alert("You continue!");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Swarzmuller',
                address: {
                    street: 'TestStreet',
                    zipCode: '99567',
                    country: 'Germany',



                },
                email: 'test@someemail.com'


            },
            deliverMethod: 'fastest'

        };

        axiosInstance.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false,  purchasing: false});

        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});

        });

    };

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, 
            ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);


    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
     
        let burger = this.state.error? <p>Ingredients can't be loaded</p>: <Spinner/>;
        if (this.state.ingredients) {
            
            burger = (
                <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addingredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled={disabledInfo}
        
                price={this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                /></Aux>

            );  
             orderSummary =   <OrderSummary 
        ingredients={this.state.ingredients}
        price = {this.state.totalPrice}
        purchaseCancelled={this.purchaseCanceledHandler}
        purchaseContinued={this.purchaseContinueHandler}
        />;

        };
     

        if (this.state.loading){
            orderSummary = <Spinner/>;

        };
       
    
        return(
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}
                  
                </Modal>
        
                {burger}
                    
            </Aux>
        );
       
    }

}

export default withErrorHandler(BurgerBuilder);