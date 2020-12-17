import { v4 as uuidv4 } from 'uuid';
import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';
import { modalTypes } from '../../shared/constants';

let updateCartItemRequests = [];

export const setCart = (cart) => ({
  type: actionTypes.SET_CART,
  cart,
});

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch(uiActions.cartStart());
    try {
      const { data } = await axios.get('/cart');
      dispatch(uiActions.cartEnd());
      dispatch(setCart(data.cart));
    } catch (error) {
      dispatch(uiActions.cartEnd());
      dispatch(setCart(null));
    }
  };
};

export const addCartItem = (item) => {
  return async (dispatch) => {
    dispatch(uiActions.cartStart());
    try {
      const { data } = await axios.patch('/cart/add', item);
      dispatch(uiActions.cartEnd());
      dispatch(setCart(data.cart));
      dispatch(uiActions.setModal(true, modalTypes.CART_ITEM_ADDED));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.cartEnd());
    }
  };
};

export const updateCartItem = (itemId, action, quantity) => {
  return async (dispatch) => {
    dispatch(uiActions.cartStart());
    try {
      const requestId = uuidv4();
      updateCartItemRequests.push(requestId);
      const quantityParam = quantity ? `&quantity=${quantity}` : '';
      const { data } = await axios.patch(`/cart/${itemId}/update?action=${action}${quantityParam}`);
      updateCartItemRequests = updateCartItemRequests.filter((request) => request !== requestId);
      if (updateCartItemRequests.length <= 0) {
        dispatch(uiActions.cartEnd());
        dispatch(setCart(data.cart));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.cartEnd());
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch(uiActions.cartStart());
    try {
      await axios.patch('/cart/clear');
      dispatch(uiActions.cartEnd());
      dispatch(setCart([]));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.cartEnd());
    }
  };
};

export const removeCartItem = (itemId) => {
  return async (dispatch) => {
    dispatch(uiActions.cartStart());
    try {
      const { data } = await axios.patch(`/cart/${itemId}/remove`);
      dispatch(uiActions.cartEnd());
      dispatch(setCart(data.cart));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.cartEnd());
    }
  };
};
