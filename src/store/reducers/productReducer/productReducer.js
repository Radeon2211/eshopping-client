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

const addProduct = (state, action) => {
  const { products, productCount, minPrice, maxPrice } = state;
  const addedProduct = action.product;
  const updatedMinPrice = addedProduct.price < minPrice ? addedProduct.price : minPrice;
  const updatedMaxPrice = addedProduct.price > maxPrice ? addedProduct.price : maxPrice;
  const updatedProducts = [addedProduct, ...products];
  return updateObject(state, {
    products: updatedProducts,
    productCount: productCount + 1,
    minPrice: updatedMinPrice,
    maxPrice: updatedMaxPrice,
  });
};

const setProductDetails = (state, action) => {
  return updateObject(state, { productDetails: action.productDetails });
};

const deleteProductDetails = (state) => {
  return updateObject(state, { productDetails: undefined });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    case actionTypes.SET_PRODUCT_DETAILS:
      return setProductDetails(state, action);
    case actionTypes.DELETE_PRODUCT_DETAILS:
      return deleteProductDetails(state);
    default:
      return state;
  }
};

export default productReducer;
