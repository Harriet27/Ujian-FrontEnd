import { combineReducers } from 'redux'; 
import { authReducer } from './authReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { transactionReducer } from './transactionReducer';

export default combineReducers({
    auth : authReducer,
    product: productReducer,
    cart: cartReducer,
    transactions: transactionReducer
})