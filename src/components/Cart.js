import React, { useState, useEffect, PureComponent } from "react";
import "./item.css";
import { connect } from "react-redux";
import { CartActions } from "../_actions/cart.action";
import Item from "./item";
import Nav from "./nav";
import { OrderActions } from "../_actions/orderNumber.action";
import store from "../_helpers/Store";
import Promos from "../_helpers/promo.json" 

function Cart(props) {
    const [warning, setWarning] = useState('')
    const [code, setCode] = useState('');
    const [payment, setPayment] = useState('');
    const { products, orderNumber } = props;
    const [discountAmount, setDiscountAmount] = useState('')
    let Store = store.getState();
    let total = 0;
    let discount;

    const totalPrice = (products) => {
        products.forEach((product) => {
        total = total + product.price * product.qty;
        });
        Store.OrderNumberReducer.TotalPrice = total;
        total = total.toFixed(2);
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
                setWarning("");
                discount = ( total * promo.discount ) / 100;
                setDiscountAmount(discount)
                setPayment((total - discount).toFixed(2));
            }else {
                setDiscountAmount('')
                setWarning("Please Enter Valid Code");
                discount ?  setPayment((total + discount).toFixed(2)) : setPayment(total.toFixed(2));
            }
        })
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
            <div>
            { warning ? <b className= "text-danger" > {warning} </b> :
                <div></div> 
            }

    </div>
        <div>
        {/* {warning
            ? <div>Please enter valid code </div> 
            : ''
        } */}
    </div>
        
        <div className="card-footer bg-transparent d-flex align-items-center">
            <div>Apply Coupon</div>
            <input type="text" className="ml-2 font-weight-light pl-2" placeholder="Enter coupon code" onChange={OnCodeChange}></input>
            <button className="btn btn-info font-weight-bolder ml-2 " onClick={handleApply}>Apply</button>
        </div>
        <div className="text-right"> Total: $ {totalPrice(products)} </div>
        { discountAmount ? <div className="text-right"> Discount Amount {discountAmount} </div> :
                <div></div> 
            }
        <div className="card-footer text-center d-flex justify-content-end">
            <h4 className="font-weight-bold mr-5 "> $ {payment}</h4>
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
