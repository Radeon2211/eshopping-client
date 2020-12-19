import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  profile: undefined,
  cart: undefined,
  placedOrders: [],
  sellHistory: [],
  transaction: null,
};

const loginUser = (state, action) => {
  return updateObject(state, { profile: action.profile });
};

const logoutUser = (state) => {
  return updateObject(state, {
    profile: null,
    cart: undefined,
    placedOrders: [],
    sellHistory: [],
    transaction: null,
  });
};

const setPlacedOrders = (state, action) => {
  return updateObject(state, { placedOrders: action.placedOrders });
};

const setSellHistory = (state, action) => {
  return updateObject(state, { sellHistory: action.sellHistory });
};

const setProfile = (state, action) => {
  if (!action.profile) return updateObject(state, { profile: action.profile });
  const profile = {
    ...action.profile,
    cart: undefined,
  };
  return updateObject(state, { profile, cart: action.profile?.cart });
};

const setCart = (state, action) => {
  return updateObject(state, { cart: action.cart });
};

const updateTransaction = (state, action) => {
  return updateObject(state, { profile: action.transaction });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return loginUser(state, action);
    case actionTypes.LOGOUT_USER:
      return logoutUser(state);
    case actionTypes.SET_PLACED_ORDERS:
      return setPlacedOrders(state, action);
    case actionTypes.SET_SELL_HISTORY:
      return setSellHistory(state, action);
    case actionTypes.SET_PROFILE:
      return setProfile(state, action);
    case actionTypes.SET_CART:
      return setCart(state, action);
    case actionTypes.UPDATE_TRANSACTION:
      return updateTransaction(state, action);
    default:
      return state;
  }
};

export default authReducer;
