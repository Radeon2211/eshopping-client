import * as actions from '../../actions/actionTypes';
import productReducer from './productReducer';

describe('Product reducer', () => {
  it('Should return default state', () => {
    expect(productReducer(undefined, {})).toEqual({
      products: [],
    });
  });

  it('Should return new state if receiving type', () => {
    const products = [
      { name: 'test name' },
    ];
    expect(productReducer(undefined, {
      type: actions.SET_PRODUCTS,
      products,
    })).toEqual({
      products,
    });
  });
});