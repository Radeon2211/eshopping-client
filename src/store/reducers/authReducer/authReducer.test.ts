import authReducer, { initialAuthReducerState } from './authReducer';
import {
  createCartItem,
  createOrder,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
  defaultUserProfile,
} from '../../../shared/testUtility/testUtility';
import { AuthAction } from '../../actions/authActions/authActionTypes';

describe('auth reducer', () => {
  it('should update profile after SET_PROFILE', () => {
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_PROFILE,
        profile: {
          ...defaultUserProfile,
          cart: [],
        },
      }),
    ).toEqual({
      ...initialAuthReducerState,
      profile: defaultUserProfile,
      deliveryAddress: defaultDeliveryAddress,
      cart: [],
    });
  });

  it('should update almost entire state after LOGOUT_USER', () => {
    const state = {
      ...initialAuthReducerState,
      profile: defaultUserProfile,
      deliveryAddress: defaultDeliveryAddress,
      cart: [],
      transaction: [],
      placedOrders: [],
      sellHistory: [],
      orderDetails: createOrder(),
      orderCount: 1,
      otherUser: {
        username: 'otherUser',
      },
    };
    expect(
      authReducer(state, {
        type: AuthAction.LOGOUT_USER,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      profile: null,
      otherUser: {
        username: 'otherUser',
      },
    });
  });

  it('should update entire deliveryAddress after SET_DELIVERY_ADDRESS', () => {
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_DELIVERY_ADDRESS,
        deliveryAddress: defaultDeliveryAddress,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      deliveryAddress: defaultDeliveryAddress,
    });
  });

  it('should update partially deliveryAddress after SET_DELIVERY_ADDRESS', () => {
    const state = {
      ...initialAuthReducerState,
      deliveryAddress: defaultDeliveryAddress,
    };
    const updatedDeliveryAddress = {
      firstName: 'firstName2',
      lastName: 'lastName2',
    };
    expect(
      authReducer(state, {
        type: AuthAction.SET_DELIVERY_ADDRESS,
        deliveryAddress: updatedDeliveryAddress,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      deliveryAddress: {
        ...defaultDeliveryAddress,
        ...updatedDeliveryAddress,
      },
    });
  });

  it('should set new cart after SET_CART', () => {
    const cart = [createCartItem()];
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_CART,
        cart,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      cart,
    });
  });

  it('should set new transaction after SET_TRANSACTION', () => {
    const transaction = [createTransactionAndOrderProdItem()];
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_TRANSACTION,
        transaction,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      transaction,
    });
  });

  it('should set new placedOrders and order count after SET_PLACED_ORDERS', () => {
    const placedOrders = [createOrder()];
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_PLACED_ORDERS,
        placedOrders,
        orderCount: placedOrders.length,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      placedOrders,
      orderCount: 1,
    });
  });

  it('should set new sellHistory and order counta after SET_SELL_HISTORY', () => {
    const sellHistory = [createOrder()];
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_SELL_HISTORY,
        sellHistory,
        orderCount: sellHistory.length,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      sellHistory,
      orderCount: 1,
    });
  });

  it('should set new orderDetails after SET_ORDER_DETAILS', () => {
    const orderDetails = createOrder();
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_ORDER_DETAILS,
        orderDetails,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      orderDetails,
    });
  });

  it('should set new otherUser after SET_OTHER_USER', () => {
    const otherUser = {
      username: 'user1',
    };
    expect(
      authReducer(undefined, {
        type: AuthAction.SET_OTHER_USER,
        otherUser,
      }),
    ).toEqual({
      ...initialAuthReducerState,
      otherUser,
    });
  });
});
