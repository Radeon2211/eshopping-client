import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import * as authActions from './authActions';
import { getErrorMessage } from '../../shared/utility';

export const addProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.formStart());
    const correctProduct = {
      ...product,
      condition: product.condition === 'not applicable' ? undefined : product.condition,
      photo: undefined,
    };
    try {
      let addedProduct = null;
      const { data: firstData } = await axios.post('/products', correctProduct);
      addedProduct = firstData.product;
      if (product.photo) {
        const formData = new FormData();
        formData.append('photo', product.photo);
        const { data: secondData } = await axios.post(`/products/${firstData.product._id}/photo`, formData);
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