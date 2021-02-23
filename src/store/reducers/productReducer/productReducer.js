import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  products: undefined,
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

const deleteProductFromList = (state, action) => {
  if (!state.products) return state;
  const updatedProducts = state.products.filter(({ _id }) => _id !== action.productId);
  return updateObject(state, { products: updatedProducts });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.SET_PRODUCT_DETAILS:
      return setProductDetails(state, action);
    case actionTypes.DELETE_PRODUCT_FROM_LIST:
      return deleteProductFromList(state, action);
    default:
      return state;
  }
};

export default productReducer;
