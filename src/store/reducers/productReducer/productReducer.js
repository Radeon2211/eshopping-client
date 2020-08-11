import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  products: [],
  minPrice: 0,
  maxPrice: 0,
};

const setProducts = (state, action) => {
  return updateObject(state, { products: action.products });
};

const setPrices = (state, action) => {
  return updateObject(state, { minPrice: action.minPrice, maxPrice: action.maxPrice });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.SET_PRICES:
      return setPrices(state, action);
    default:
      return state;
  }
};

export default productReducer;
