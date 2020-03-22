import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    potato: 1.0,
    cheese: 0.7,
    chicken: 2.0
}
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        ticketPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

componentDidMount = () => {
    axios.get('https://burgerbuildeer.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
            console.log(response.data)
        })
        .catch(error => {
            this.setState({error: true})
        })
        
}

    
updatePurchaseble = (ingredients) => {
    const sum = Object.keys(ingredients).
                    map( igKey => ingredients[igKey]).
                    reduce((sum,el) => {
                        return sum + el;
                    },0);
    this.setState({purchasable: sum > 0})
                    
}



addIngredients = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount + 1
    const updatedIngredients = {
        ...this.state.ingredients    
    };
    updatedIngredients[type] = newCount;
    const additionalCost = INGREDIENTS_PRICE[type]
    const updatedPrice = this.state.ticketPrice + additionalCost
    this.setState({
        ingredients: updatedIngredients,
        ticketPrice: updatedPrice
    })
    this.updatePurchaseble(updatedIngredients);
}

removeIngredients = (type) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0){
        return;
    }
    const newCount = oldCount - 1
    const updatedIngredients = {
        ...this.state.ingredients    
    };
    updatedIngredients[type] = newCount;
    const decrementalCost = INGREDIENTS_PRICE[type]
    const updatedPrice = this.state.ticketPrice - decrementalCost
    this.setState({
        ingredients: updatedIngredients,
        ticketPrice: updatedPrice
    })
    this.updatePurchaseble(updatedIngredients);
}

purchaseHandler = () => {
    this.setState({purchasing: true})
}

backDropClicked = () => {
    this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
    //alert('Continue');
    this.setState({loading: true})
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.ticketPrice,
        customer: {
            name: 'Santosh',
            address: {
                street: 'Street 1',
                zipCode:'752552',
                country: 'India'
            },
            email: 'sac@test.com',
        },
        deliveryMethod: 'fastest'

        }
    axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
        });

}

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        
        
        
        let burger = this.state.error ? <p> Ingredients cannot be loaded</p>: <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients ={this.state.ingredients}></Burger>
                    <BuildControls 
                        add = {this.addIngredients} 
                        remove = {this.removeIngredients}
                        disable = {disabledInfo}
                        purchasable = {!this.state.purchasable}
                        price = {this.state.ticketPrice}
                        ordered = {this.purchaseHandler}/>
                </Auxiliary>
            );
            orderSummary = (<OrderSummary 
                            continue = {this.purchaseContinueHandler}
                            cancel = {this.backDropClicked} 
                            ingredients = {this.state.ingredients}
                            price = {this.state.ticketPrice}>
                            </OrderSummary>
            )}
        if (this.state.loading){
            orderSummary = <Spinner/>;

        }
        
        return (
            <Auxiliary>
                <Modal show = {this.state.purchasing} clicked = {this.backDropClicked}>
                    {orderSummary}
                </Modal>
                {burger}           
            </Auxiliary>           
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);