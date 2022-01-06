import {combineReducers} from 'redux';
import ProductReducer from './product.reducer';
import CartReducer from "./cart.reducer"
import OrderNumberReducer from "./orderNumber.reducer"

const rootReducer = combineReducers({
    ProductReducer, CartReducer, OrderNumberReducer
});

export default rootReducer;
