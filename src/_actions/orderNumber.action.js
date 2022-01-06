import OrderNumberonstants from '../_constants/orderNumber.constant';

export const OrderActions = {
  generateOrderNo 
}

function generateOrderNo (value) {
    return{
        type: OrderNumberonstants.GET_ORDER_NUMBER,
        value:value
    }
}