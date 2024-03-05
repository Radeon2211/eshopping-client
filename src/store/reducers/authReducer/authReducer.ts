import { updateObject } from '../../../shared/utility/utility';
import {
  Cart,
  DeliveryAddress,
  Order,
  OtherUser,
  Profile,
  ProfileWithCart,
  Transaction,
} from '../../../shared/types/types';
import { AuthAction } from '../../actions/authActions/authActionTypes';

interface AuthReucerState {
  profile?: Profile;
  deliveryAddress?: DeliveryAddress;
  cart?: Cart;
  transaction?: Transaction;
  placedOrders?: Order[];
  sellHistory?: Order[];
  orderDetails?: Order;
  orderCount?: number;
  otherUser?: OtherUser;
}

export const initialState: AuthReucerState = {
  profile: undefined,
  deliveryAddress: undefined,
  cart: undefined,
  transaction: undefined,
  placedOrders: undefined,
  sellHistory: undefined,
  orderDetails: undefined,
  orderCount: undefined,
  otherUser: undefined,
};

type LogoutUserAction = {
  type: AuthAction.LOGOUT_USER;
};
const logoutUser = (state: AuthReucerState) => {
  return updateObject(state, {
    profile: null,
    deliveryAddress: undefined,
    cart: undefined,
    transaction: undefined,
    placedOrders: undefined,
    sellHistory: undefined,
    orderDetails: undefined,
    orderCount: undefined,
  });
};

type SetProfileAction = {
  type: AuthAction.SET_PROFILE;
  profile: ProfileWithCart;
};
const setProfile = (state: AuthReucerState, action: SetProfileAction) => {
  if (!action.profile) return updateObject(state, { profile: action.profile });
  const profile = {
    ...action.profile,
    cart: undefined,
  };
  const deliveryAddress: DeliveryAddress = {
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

type SetDeliveryAddressAction = {
  type: AuthAction.SET_DELIVERY_ADDRESS;
  deliveryAddress: Partial<DeliveryAddress>;
};
const setDeliveryAddress = (state: AuthReucerState, action: SetDeliveryAddressAction) => {
  const updatedDeliveryAddress = {
    ...state.deliveryAddress,
    ...action.deliveryAddress,
  };
  return updateObject(state, { deliveryAddress: updatedDeliveryAddress });
};

type SetCartAction = {
  type: AuthAction.SET_CART;
  cart: Cart;
};
const setCart = (state: AuthReucerState, action: SetCartAction) => {
  return updateObject(state, { cart: action.cart });
};

type SetTransactionAction = {
  type: AuthAction.SET_TRANSACTION;
  transaction: Transaction;
};
const setTransaction = (state: AuthReucerState, action: SetTransactionAction) => {
  return updateObject(state, { transaction: action.transaction });
};

type SetPlacedOrdersAction = {
  type: AuthAction.SET_PLACED_ORDERS;
  placedOrders: Order[];
  orderCount: number;
};
const setPlacedOrders = (state: AuthReucerState, action: SetPlacedOrdersAction) => {
  return updateObject(state, { placedOrders: action.placedOrders, orderCount: action.orderCount });
};

type SetSellHistoryAction = {
  type: AuthAction.SET_SELL_HISTORY;
  sellHistory: Order[];
  orderCount: number;
};
const setSellHistory = (state: AuthReucerState, action: SetSellHistoryAction) => {
  return updateObject(state, { sellHistory: action.sellHistory, orderCount: action.orderCount });
};

type SetOrderDetailsAction = {
  type: AuthAction.SET_ORDER_DETAILS;
  orderDetails: Order;
};
const setOrderDetails = (state: AuthReucerState, action: SetOrderDetailsAction) => {
  return updateObject(state, { orderDetails: action.orderDetails });
};

type SetOtherUserAction = {
  type: AuthAction.SET_OTHER_USER;
  otherUser: OtherUser;
};
const setOtherUser = (state: AuthReucerState, action: SetOtherUserAction) => {
  return updateObject(state, { otherUser: action.otherUser });
};

type AuthReducerAction =
  | LogoutUserAction
  | SetProfileAction
  | SetDeliveryAddressAction
  | SetCartAction
  | SetTransactionAction
  | SetPlacedOrdersAction
  | SetSellHistoryAction
  | SetOrderDetailsAction
  | SetOtherUserAction;
// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action: AuthReducerAction) => {
  switch (action.type) {
    case AuthAction.LOGOUT_USER:
      return logoutUser(state);
    case AuthAction.SET_PROFILE:
      return setProfile(state, action);
    case AuthAction.SET_DELIVERY_ADDRESS:
      return setDeliveryAddress(state, action);
    case AuthAction.SET_CART:
      return setCart(state, action);
    case AuthAction.SET_PLACED_ORDERS:
      return setPlacedOrders(state, action);
    case AuthAction.SET_SELL_HISTORY:
      return setSellHistory(state, action);
    case AuthAction.SET_TRANSACTION:
      return setTransaction(state, action);
    case AuthAction.SET_ORDER_DETAILS:
      return setOrderDetails(state, action);
    case AuthAction.SET_OTHER_USER:
      return setOtherUser(state, action);
    default:
      return state;
  }
};

export default authReducer;
