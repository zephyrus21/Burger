import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';

import Axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let display = this.props.orders.map((order) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ));

        if (this.props.loading) {
            display = <Spinner />;
        }

        return <div>{display}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, Axios));
