import * as actionTypes from '../../actions/actionTypes';
import authReducer from './authReducer';

describe('Auth reducer', () => {
  it('Should return default state', () => {
    expect(authReducer(undefined, {})).toEqual({
      profile: undefined,
      placedOrders: [],
      sellHistory: [],
      products: [],
      transaction: null,
    });
  });

  it('Should return new state if receiving type', () => {
    const userProfile = {
      username: 'Test username',
    };
    expect(authReducer(undefined, {
      type: actionTypes.SET_PROFILE,
      profile: userProfile,
    })).toEqual({
      profile: userProfile,
      placedOrders: [],
      sellHistory: [],
      products: [],
      transaction: null,
    });
  });
});