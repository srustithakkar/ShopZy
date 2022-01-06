import OrderNumberonstants from "../_constants/orderNumber.constant";

const InitialValues = {
    OrderNumber: 0,
    TotalPrice: null,
};

export default function OrderNumberReducer(state = InitialValues, action) {
    switch (action.type) {
        case OrderNumberonstants.GET_ORDER_NUMBER: {
            state.OrderNumber = state.OrderNumber + 1;
            return {
                OrderNumber: state.OrderNumber,
                ...state,
            };
        }
        default:
            return state;
    }
}
