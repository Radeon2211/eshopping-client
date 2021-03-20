import * as actions from '../../actions/actionTypes';
import productReducer, { initialState } from './productReducer';

describe('Product reducer', () => {
  it('should return default state', () => {
    expect(productReducer(undefined, {})).toEqual(initialState);
  });

  it('should return new state after SET_PRODUCTS', () => {
    const products = [
      { _id: '1', price: 1 },
      { _id: '2', price: 2 },
    ];
    expect(
      productReducer(undefined, {
        type: actions.SET_PRODUCTS,
        products,
        productCount: 5,
        minPrice: 1,
        maxPrice: 2,
      }),
    ).toEqual({
      products,
      productCount: 5,
      productDetails: undefined,
      minPrice: 1,
      maxPrice: 2,
    });
  });

  it('should return new state after SET_PRODUCT_DETAILS', () => {
    const productDetails = { _id: '1' };
    expect(
      productReducer(undefined, {
        type: actions.SET_PRODUCT_DETAILS,
        productDetails,
      }),
    ).toEqual({
      ...initialState,
      productDetails,
    });
  });

  it('should return new state after DELETE_PRODUCT_FROM_LIST', () => {
    const state = {
      ...initialState,
      products: [
        { _id: '1', price: 1 },
        { _id: '2', price: 2 },
      ],
    };
    expect(
      productReducer(state, {
        type: actions.DELETE_PRODUCT_FROM_LIST,
        productId: '1',
      }),
    ).toEqual({
      ...initialState,
      products: [{ _id: '2', price: 2 }],
    });
  });
});
