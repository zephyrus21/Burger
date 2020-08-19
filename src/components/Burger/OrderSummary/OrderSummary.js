import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
                {props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>The following ingredients are:</p>
            <ul>{ingredientsSummary}</ul>
            <p>
                Total Price: <strong>{props.price}.00</strong>
            </p>
            <p>Continue to Check Out</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>
                Continue
            </Button>
        </Aux>
    );
};

export default orderSummary;
