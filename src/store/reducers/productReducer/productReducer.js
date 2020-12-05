import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  products: null,
  productCount: undefined,
  productDetails: undefined,
  minPrice: 0,
  maxPrice: 0,
};

const setProducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
    productCount: action.productCount,
    minPrice: action.minPrice,
    maxPrice: action.maxPrice,
  });
};

const setProductDetails = (state, action) => {
  return updateObject(state, { productDetails: action.productDetails });
};

const deleteProductDetails = (state) => {
  return updateObject(state, { productDetails: undefined });
};

const deleteProductFromList = (state, action) => {
  if (!state.products) return state;
  const updatedProducts = state.products.filter(({ _id }) => _id !== action.productId);
  return updateObject(state, { products: updatedProducts });
};

const clearProducts = (state) => {
  return updateObject(state, {
    products: null,
    productCount: undefined,
    minPrice: 0,
    maxPrice: 0,
  });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.SET_PRODUCT_DETAILS:
      return setProductDetails(state, action);
    case actionTypes.DELETE_PRODUCT_DETAILS:
      return deleteProductDetails(state);
    case actionTypes.DELETE_PRODUCT_FROM_LIST:
      return deleteProductFromList(state, action);
    case actionTypes.CLEAR_PRODUCTS:
      return clearProducts(state);
    default:
      return state;
  }
};

export default productReducer;
