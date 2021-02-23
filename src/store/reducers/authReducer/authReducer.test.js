import * as actionTypes from '../../actions/actionTypes';
import authReducer, { initialState } from './authReducer';
import { defaultDeliveryAddress, defaultUserProfile } from '../../../shared/testUtility';

describe('Auth reducer', () => {
  it('Should return default state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_PROFILE', () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_PROFILE,
        profile: defaultUserProfile,
      }),
    ).toEqual({
      ...initialState,
      profile: defaultUserProfile,
      deliveryAddress: defaultDeliveryAddress,
    });
  });

  it('Should return new state after LOGOUT_USER', () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.LOGOUT_USER,
      }),
    ).toEqual({
      ...initialState,
      profile: null,
    });
  });

  it('Should return new state after SET_DELIVERY_ADDRESS - completely new', () => {
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

  it('Should return new state after SET_DELIVERY_ADDRESS - only update', () => {
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

  it('Should return new state after SET_CART', () => {
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

  it('Should return new state after SET_TRANSACTION', () => {
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

  it('Should return new state after SET_PLACED_ORDERS', () => {
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

  it('Should return new state after SET_SELL_HISTORY', () => {
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

  it('Should return new state after SET_ORDER_DETAILS', () => {
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

  it('Should return new state after SET_OTHER_USER', () => {
    const otherUser = {
      _id: 'u1',
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
