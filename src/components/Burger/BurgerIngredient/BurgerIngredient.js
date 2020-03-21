import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch(this.props.type){
            case('bread-bottom'):
                ingredient = <div className = {classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                ingredient = (
                    <div className = {classes.BreadTop}>
                        <div className = {classes.Seeds1}></div>
                        <div className = {classes.Seeds2}></div>
                    </div>
                );
                break;
            case('chicken'):
                    ingredient = <div className ={classes.Chicken}></div>;
                    break;
            case('cheese'):
                    ingredient = <div className ={classes.Cheese}></div>;
                    break;
            case('salad'):
                    ingredient = <div className ={classes.Salad}></div>;
                    break;
            case('potato'):
                    ingredient = <div className ={classes.Potato}></div>;
                    break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;