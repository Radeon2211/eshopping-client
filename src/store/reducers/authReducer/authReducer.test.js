import * as actionTypes from '../../actions/actionTypes';
import authReducer, { initialState } from './authReducer';

describe('Auth reducer', () => {
  it('Should return default state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_PROFILE', () => {
    const deliveryAddress = {
      firstName: 'firstName',
      lastName: 'lastName',
      street: 'street',
      zipCode: 'zipCode',
      city: 'city',
      country: 'country',
      phone: 'phone',
    };
    const userProfile = {
      username: 'Test username',
      ...deliveryAddress,
    };
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_PROFILE,
        profile: userProfile,
      }),
    ).toEqual({
      ...initialState,
      profile: userProfile,
      deliveryAddress,
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
    const deliveryAddress = {
      firstName: 'firstName',
      lastName: 'lastName',
      street: 'street',
      zipCode: 'zipCode',
      city: 'city',
      country: 'country',
      phone: 'phone',
    };
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_DELIVERY_ADDRESS,
        deliveryAddress,
      }),
    ).toEqual({
      ...initialState,
      deliveryAddress,
    });
  });

  
  it('Should return new state after SET_DELIVERY_ADDRESS - only update', () => {
    const state = {
      ...initialState,
      deliveryAddress: {
        firstName: 'firstName',
        lastName: 'lastName',
        street: 'street',
        zipCode: 'zipCode',
        city: 'city',
        country: 'country',
        phone: 'phone',
      },
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
        firstName: 'firstName2',
        lastName: 'lastName2',
        street: 'street',
        zipCode: 'zipCode',
        city: 'city',
        country: 'country',
        phone: 'phone',
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

  it('Should return new state after SET_OTHER_USER', () => {
    const otherUser = {
      _id: 'u1',
      username: 'user1'
    }
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

  it('Should return new state after SET_TRANSACTION', () => {
    const transaction = [{
      seller: 'u1',
      products: [{
        _id: 'p1',
        name: 'product1',
      }],
    }];
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
});
