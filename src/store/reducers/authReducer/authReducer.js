import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  profile: undefined,
  deliveryAddress: undefined,
  cart: undefined,
  otherUser: undefined,
  placedOrders: [],
  sellHistory: [],
  transaction: undefined,
};

const logoutUser = (state) => {
  return updateObject(state, {
    profile: null,
    deliveryAddress: undefined,
    cart: undefined,
    placedOrders: [],
    sellHistory: [],
    transaction: undefined,
  });
};

const setProfile = (state, action) => {
  if (!action.profile) return updateObject(state, { profile: action.profile });
  const profile = {
    ...action.profile,
    cart: undefined,
  };
  const deliveryAddress = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    street: profile.street,
    zipCode: profile.zipCode,
    city: profile.city,
    country: profile.country,
    phone: profile.phone,
  };
  return updateObject(state, { profile, cart: action.profile?.cart, deliveryAddress });
};

const setDeliveryAddress = (state, action) => {
  const updatedDeliveryAddress = {
    ...state.deliveryAddress,
    ...action.deliveryAddress,
  };
  return updateObject(state, { deliveryAddress: updatedDeliveryAddress });
};

const setCart = (state, action) => {
  return updateObject(state, { cart: action.cart });
};

const setOtherUser = (state, action) => {
  return updateObject(state, { otherUser: action.otherUser });
};

const setPlacedOrders = (state, action) => {
  return updateObject(state, { placedOrders: action.placedOrders });
};

const setSellHistory = (state, action) => {
  return updateObject(state, { sellHistory: action.sellHistory });
};

const setTransaction = (state, action) => {
  return updateObject(state, { transaction: action.transaction });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_USER:
      return logoutUser(state);
    case actionTypes.SET_PROFILE:
      return setProfile(state, action);
    case actionTypes.SET_DELIVERY_ADDRESS:
      return setDeliveryAddress(state, action);
    case actionTypes.SET_CART:
      return setCart(state, action);
    case actionTypes.SET_OTHER_USER:
      return setOtherUser(state, action);
    case actionTypes.SET_PLACED_ORDERS:
      return setPlacedOrders(state, action);
    case actionTypes.SET_SELL_HISTORY:
      return setSellHistory(state, action);
    case actionTypes.SET_TRANSACTION:
      return setTransaction(state, action);
    default:
      return state;
  }
};

export default authReducer;
