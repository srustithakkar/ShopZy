import CartConstants from '../_constants/cart.constants'
import {
    findIndex
} from 'lodash'

const InitialValues = {
    products: [],
}

export default function cartReducer(state = InitialValues, action) {

    switch (action.type) {
        case CartConstants.ADD_PRODUCT: {
            const productIndex = findIndex(state.products, {
                productName: action.payload.productName
            })
            if (productIndex === -1) {
                state.products.push({
                    productName: action.payload.productName,
                    price: action.payload.price,
                    qty: 1
                })
            } else {
                state.products[productIndex].qty = state.products[productIndex].qty + 1;
            }
            return {
                ...state,
                rerender: !state.rerender
            }
        }

        case CartConstants.PLACE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case CartConstants.PLACE_ORDER_SUCCESS: {
            return {
                ...state,
                products: [],
                loading: false
            }
        }
        case CartConstants.PLACE_ORDER_FAILURE: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state
    }
}
