import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

//! all the ingredients are made up to a burger
const burger = (props) => {
    //! Object.keys() --> it converts object to an array but only the ingredients salad, meat etc. not their quantity
    let transformIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            //console.log(igKey); // ! gives the ingredients
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //console.log(i); //! gives the no of ingredients
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            //! to store all in a single array
            return arr.concat(el);
        }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please add some ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);
