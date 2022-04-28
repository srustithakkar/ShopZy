import cartConstants from '../_constants/cart.constants';
import axios from "axios";
import store from "../_helpers/Store"

export const CartActions = {
    addProduct,
    placeOrder
}

function addProduct(product) {
    return {
        type: cartConstants.ADD_PRODUCT,
        payload: product
    }
}

function placeOrder(products) {
    let state = store.getState()
    let orderNumber = state.OrderNumberReducer['OrderNumber'];
    let totalPrice = state.OrderNumberReducer['TotalPrice'];
    const placeOrderRequest = () => {
        return {
            type: cartConstants.PLACE_ORDER_REQUEST
        }
    }
    const placeOrderSuccess = (data) => {
        console.log(this.payload)
        return {
            type: cartConstants.PLACE_ORDER_SUCCESS,
            payload: [{
                productName: data._id,
                price: data.title,
                qty: data.body,
            }]
        }
    };
    const placeOrderFailure = (data) => {
        return {
            type: cartConstants.PLACE_ORDER_FAILURE
        }
    }
    return (dispatch) => {
        dispatch(placeOrderRequest())
        axios.post(`https://janam.free.beeceptor.com`, {
                "items": products,
                "orderNuber": orderNumber,
                "totalPrice": totalPrice
            })
            .then(response => {
                dispatch(placeOrderSuccess(response.data))
            }).catch(error => {
                dispatch(placeOrderFailure());
            })
    }
}
