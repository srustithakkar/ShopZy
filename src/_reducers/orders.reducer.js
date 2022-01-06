import OrderConstants from '../_constants/order.constants'

const InitialValues = {
    orders: [],
}

export default function orderReducer(state = InitialValues, action) {

    switch (action.type) {
        case OrderConstants.GET_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case OrderConstants.GET_ORDER_SUCCESS: {
            return {
                ...state,
                orders: action.payload.data,
                loading: false
            }
        }
        case OrderConstants.GET_ORDER_FAILURE: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state
    }
}