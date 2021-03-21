import * as actionTypes from '../../actions/actionTypes';
import authReducer, { initialState } from './authReducer';
import {
  createOrder,
  defaultDeliveryAddress,
  defaultUserProfile,
} from '../../../shared/testUtility/testUtility';

describe('Auth reducer', () => {
  it('should return initial state after passing empty object', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should update profile after SET_PROFILE', () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_PROFILE,
        profile: {
          ...defaultUserProfile,
          cart: [],
        },
      }),
    ).toEqual({
      ...initialState,
      profile: defaultUserProfile,
      deliveryAddress: defaultDeliveryAddress,
      cart: [],
    });
  });

  it('should update almost entire state after LOGOUT_USER', () => {
    const state = {
      ...initialState,
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
        type: actionTypes.LOGOUT_USER,
      }),
    ).toEqual({
      ...initialState,
      profile: null,
      otherUser: {
        username: 'otherUser',
      },
    });
  });

  it('should update entire deliveryAddress after SET_DELIVERY_ADDRESS', () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_DELIVERY_ADDRESS,
        deliveryAddress: defaultDeliveryAddress,
      }),
    ).toEqual({
      ...initialState,
      deliveryAddress: defaultDeliveryAddress,
    });
  });

  it('should update partially deliveryAddress after SET_DELIVERY_ADDRESS', () => {
    const state = {
      ...initialState,
      deliveryAddress: defaultDeliveryAddress,
    };
    const updatedDeliveryAddress = {
      firstName: 'firstName2',
      lastName: 'lastName2',
    };
    expect(
      authReducer(state, {
        type: actionTypes.SET_DELIVERY_ADDRESS,
        deliveryAddress: updatedDeliveryAddress,
      }),
    ).toEqual({
      ...initialState,
      deliveryAddress: {
        ...defaultDeliveryAddress,
        ...updatedDeliveryAddress,
      },
    });
  });

  it('should set new cart after SET_CART', () => {
    const cart = [{ _id: '1' }];
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_CART,
        cart,
      }),
    ).toEqual({
      ...initialState,
      cart,
    });
  });

  it('should set new transaction after SET_TRANSACTION', () => {
    const transaction = [
      {
        seller: 'u1',
        products: [
          {
            _id: 'p1',
            name: 'product1',
          },
        ],
      },
    ];
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_TRANSACTION,
        transaction,
      }),
    ).toEqual({
      ...initialState,
      transaction,
    });
  });

  it('should set new placedOrders and order count after SET_PLACED_ORDERS', () => {
    const placedOrders = [
      {
        _id: 'o1',
        seller: 'u1',
        buyer: 'u2',
      },
    ];
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_PLACED_ORDERS,
        placedOrders,
        orderCount: placedOrders.length,
      }),
    ).toEqual({
      ...initialState,
      placedOrders,
      orderCount: 1,
    });
  });

  it('should set new sellHistory and order counta after SET_SELL_HISTORY', () => {
    const sellHistory = [
      {
        _id: 'o1',
        seller: 'u1',
        buyer: 'u2',
      },
    ];
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_SELL_HISTORY,
        sellHistory,
        orderCount: sellHistory.length,
      }),
    ).toEqual({
      ...initialState,
      sellHistory,
      orderCount: 1,
    });
  });

  it('should set new orderDetails after SET_ORDER_DETAILS', () => {
    const orderDetails = { _id: 'o1' };
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_ORDER_DETAILS,
        orderDetails,
      }),
    ).toEqual({
      ...initialState,
      orderDetails,
    });
  });

  it('should set new otherUser after SET_OTHER_USER', () => {
    const otherUser = {
      username: 'user1',
    };
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_OTHER_USER,
        otherUser,
      }),
    ).toEqual({
      ...initialState,
      otherUser,
    });
  });
});
