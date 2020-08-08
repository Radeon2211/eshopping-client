import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  products: [],
};

const setProducts = (state, action) => {
  return updateObject(state, { products: action.products });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    default:
      return state;
  }
};

export default productReducer;
