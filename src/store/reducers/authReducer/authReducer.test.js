import * as actionTypes from '../../actions/actionTypes';
import authReducer, { initialState } from './authReducer';

describe('Auth reducer', () => {
  it('Should return default state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_PROFILE', () => {
    const userProfile = {
      username: 'Test username',
    };
    expect(
      authReducer(undefined, {
        type: actionTypes.SET_PROFILE,
        profile: userProfile,
      }),
    ).toEqual({
      ...initialState,
      profile: userProfile,
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
});
