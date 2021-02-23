import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';
import productReducer from './productReducer/productReducer';
import uiReducer from './uiReducer/uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  ui: uiReducer,
});

export default rootReducer;
