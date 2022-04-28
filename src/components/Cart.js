import React, { useState, useEffect } from "react";
import "./item.css";
import { connect } from "react-redux";
import { CartActions } from "../_actions/cart.action";
import Item from "./item";
import Nav from "./nav";
import { OrderActions } from "../_actions/orderNumber.action";
import store from "../_helpers/Store";
import Promos from "../_helpers/promo.json" 

function Cart(props) {
    let warning = false;
    const [code, setCode] = useState('');
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
    
    const handleApply = () => {
        Promos.promo.map((promo) => {
            if(code === promo.promoCode) {
                console.log("promo is applicable")
            
            }else {
                warning = true;
                console.log(warning)
            }
        })
    }

    function Warning(props) {
        console.log("warning")
        const warning = props.warning;
        if (warning) {
            return <div>Please enter valid code</div>
        }else {
            return ''
        }
    }
      

const OnCodeChange = (e) => {
        setCode(e.target.value)
    }
    return (
        <div>
        <Nav />
        <div className="row m-4">
            {products.map((item, key) => (
            <Item addProduct={props.addProduct} products={products} item={item} key={key} />
            ))}
        </div>
        <Warning warning= {warning}/> 
        <div className="card-footer bg-transparent d-flex align-items-center">
            <div>Apply Coupon</div>
            <input type="text" className="ml-2 font-weight-light pl-2" placeholder="Enter coupon code" onChange={OnCodeChange}></input>
            <button className="btn btn-info font-weight-bolder ml-2 " onClick={handleApply}>Apply</button>
        </div>
        <div className="card-footer text-center d-flex justify-content-between">
            <h4 className="font-weight-bold ">Total: $ {totalPrice(products)} </h4>
            <button
            type="button"
            className="btn btn-info font-weight-bolder"
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
