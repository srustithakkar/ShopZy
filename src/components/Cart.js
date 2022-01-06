import React from "react";
import "./item.css";
import { connect } from "react-redux";
import { CartActions } from "../_actions/cart.action";
import Item from "./item";
import Nav from "./nav";
import { OrderActions } from "../_actions/orderNumber.action";
import store from "../_helpers/Store";

function Cart(props) {
    const { products, orderNumber } = props;
    let Store = store.getState();
    const totalPrice = (products) => {
        let total = 0;
        products.forEach((product) => {
        total = total + product.price * product.qty;
        });
        Store.OrderNumberReducer.TotalPrice = total;
        return total;
    };
    const addOrderNumber = (products) => {
        props.addOrder(products);
    };

    const handlePlaceOrder = () => {
        console.log(orderNumber, "orderno");

        addOrderNumber(products);
        return props.placeOrder(products);
    };

    return (
        <div>
        <Nav />
        <div className="row m-4">
            {products.map((item) => (
            <Item addProduct={props.addProduct} products={products} item={item} />
            ))}
        </div>
        <div class="card-footer text-center d-flex justify-content-between">
            <h4 className="font-weight-bold ">Total: {totalPrice(products)} Rs.</h4>
            <button
            type="button"
            class="btn btn-info font-weight-bolder"
            onClick={handlePlaceOrder}
            >
            Place Order
            </button>{" "}
        </div>
        </div>
    );
    }

    const mapStateToProps = (state) => {
    const products = state.CartReducer.products;
    return {
        products,
        orderNumber: state.OrderNumberReducer.OrderNumber,
        rerender: state.CartReducer.rerender,
    };
    };

    const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: (order) => dispatch(OrderActions.generateOrderNo(order)),
        addProduct: (product) => dispatch(CartActions.addProduct(product)),
        placeOrder: (products) => dispatch(CartActions.placeOrder(products)),
    };
};

    export default connect(mapStateToProps, mapDispatchToProps)(Cart);
