import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  ui: uiReducer,
});

export default rootReducer;
