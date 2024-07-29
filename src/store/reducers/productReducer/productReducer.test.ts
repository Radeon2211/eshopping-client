import { createProductItem } from '../../../shared/testUtility/testUtility';
import { ProductAction } from '../../actions/productActions/productActionTypes';
import productReducer, { initialProductReducerState } from './productReducer';

describe('Product reducer', () => {
  it('should set new products, productCount, minPrice and maxPrice after SET_PRODUCTS', () => {
    const products = [createProductItem(), createProductItem()];
    expect(
      productReducer(undefined, {
        type: ProductAction.SET_PRODUCTS,
        products,
        productCount: 5,
        minPrice: 1,
        maxPrice: 2,
      }),
    ).toEqual({
      products,
      productCount: 5,
      minPrice: 1,
      maxPrice: 2,
    });
  });

  it('should set new productDetails after SET_PRODUCT_DETAILS', () => {
    const productDetails = createProductItem();
    expect(
      productReducer(undefined, {
        type: ProductAction.SET_PRODUCT_DETAILS,
        productDetails,
      }),
    ).toEqual({
      ...initialProductReducerState,
      productDetails,
    });
  });

  it('should remove correct product from products after DELETE_PRODUCT_FROM_LIST', () => {
    const products = [createProductItem({})];
    const state = {
      ...initialProductReducerState,
      products,
    };
    expect(
      productReducer(state, {
        type: ProductAction.DELETE_PRODUCT_FROM_LIST,
        productId: '1',
      }),
    ).toEqual({
      ...initialProductReducerState,
      products,
    });
  });
});
