import * as actions from '../../actions/actionTypes';
import productReducer from './productReducer';

describe('Product reducer', () => {
  it('Should return default state', () => {
    expect(productReducer(undefined, {})).toEqual({
      products: null,
      productCount: undefined,
      productDetails: undefined,
      minPrice: 0,
      maxPrice: 0,
    });
  });

  it('Should return new state if receiving type', () => {
    const products = [{ name: 'test name', price: 1 }];
    expect(
      productReducer(undefined, {
        type: actions.SET_PRODUCTS,
        products,
        productCount: 1,
        minPrice: 1,
        maxPrice: 1,
      }),
    ).toEqual({
      products,
      productCount: 1,
      productDetails: undefined,
      minPrice: 1,
      maxPrice: 1,
    });
  });
});
