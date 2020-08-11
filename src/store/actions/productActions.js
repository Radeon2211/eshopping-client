import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import * as authActions from './authActions';
import { getErrorMessage } from '../../shared/utility';

export const setProducts = (products) => ({
  type: actionTypes.SET_PRODUCTS,
  products,
});

export const setPrices = (minPrice, maxPrice) => ({
  type: actionTypes.SET_PRICES,
  minPrice,
  maxPrice,
});

export const addProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.formStart());
    const correctProduct = {
      ...product,
      photo: undefined,
    };
    try {
      let addedProduct = null;
      const { data: firstData } = await axios.post('/products', correctProduct);
      addedProduct = firstData.product;
      if (product.photo) {
        const formData = new FormData();
        formData.append('photo', product.photo);
        const { data: secondData } = await axios.post(
          `/products/${firstData.product._id}/photo`,
          formData,
        );
        addedProduct = secondData.product;
      }
      const currentUserProducts = getState().auth.products;
      currentUserProducts.unshift(addedProduct);
      dispatch(authActions.setUserProducts(currentUserProducts));
      dispatch(uiActions.formSuccess('Product was added successfully'));
      setTimeout(() => {
        dispatch(uiActions.deleteMessage());
      }, 5000);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProducts = (queryStrings) => {
  return async (dispatch) => {
    dispatch(uiActions.listStart());
    try {
      const { data } = await axios.get(`/products${queryStrings}`);
      if (data.productPrices.length > 0) {
        const { minPrice, maxPrice } = data.productPrices[0];
        dispatch(setPrices(minPrice, maxPrice));
      }
      dispatch(setProducts(data.products));
      dispatch(uiActions.listSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.listFail(errorMessage));
    }
  };
};
