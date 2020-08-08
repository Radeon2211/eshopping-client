import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  profile: undefined,
  placedOrders: [],
  sellHistory: [],
  products: [],
  transaction: null,
};

const loginUser = (state, action) => {
  return updateObject(state, { profile: action.profile });
};

const logoutUser = (state) => {
  return updateObject(state, { profile: null, placedOrders: null, sellHistory: null, products: null, transaction: null });
};

const setPlacedOrders = (state, action) => {
  return updateObject(state, { placedOrders: action.placedOrders });
};

const setSellHistory = (state, action) => {
  return updateObject(state, { sellHistory: action.sellHistory });
};

const setUserProducts = (state, action) => {
  return updateObject(state, { products: action.products });
};

const setProfile = (state, action) => {
  return updateObject(state, { profile: action.profile });
};

const updateTransaction = (state, action) => {
  return updateObject(state, { profile: action.transaction });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return loginUser(state, action);
    case actionTypes.LOGOUT_USER:
      return logoutUser(state, action);
    case actionTypes.SET_PLACED_ORDERS:
      return setPlacedOrders(state, action);
    case actionTypes.SET_SELL_HISTORY:
      return setSellHistory(state, action);
    case actionTypes.SET_USER_PRODUCTS:
      return setUserProducts(state, action);
    case actionTypes.SET_PROFILE:
      return setProfile(state, action);
    case actionTypes.UPDATE_TRANSACTION:
      return updateTransaction(state, action);
    default:
      return state;
  }
};

export default authReducer;
