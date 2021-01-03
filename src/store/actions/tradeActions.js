import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';
import { modalTypes } from '../../shared/constants';

let updateCartItemReqCounter = 0;

export const setCart = (cart) => ({
  type: actionTypes.SET_CART,
  cart,
});

export const setTransaction = (transaction) => ({
  type: actionTypes.SET_TRANSACTION,
  transaction,
});

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      const { data } = await axios.get('/cart');
      dispatch(uiActions.tradeEnd());
      dispatch(setCart(data.cart));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
      dispatch(setCart(null));
    }
  };
};

export const addCartItem = (item) => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      const { data } = await axios.patch('/cart/add', item);
      dispatch(uiActions.tradeEnd());
      dispatch(setCart(data.cart));
      dispatch(uiActions.setModal(true, modalTypes.CART_ITEM_ADDED));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const updateCartItem = (itemId, action, quantity) => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      updateCartItemReqCounter += 1;
      const quantityParam = quantity ? `&quantity=${quantity}` : '';
      const { data } = await axios.patch(`/cart/${itemId}/update?action=${action}${quantityParam}`);
      updateCartItemReqCounter -= 1;
      if (updateCartItemReqCounter <= 0) {
        dispatch(uiActions.tradeEnd());
        dispatch(setCart(data.cart));
        dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      await axios.patch('/cart/clear');
      dispatch(uiActions.tradeEnd());
      dispatch(setCart([]));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const removeCartItem = (itemId) => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      const { data } = await axios.patch(`/cart/${itemId}/remove`);
      dispatch(uiActions.tradeEnd());
      dispatch(setCart(data.cart));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const goToTransaction = (history, singleItem) => {
  return async (dispatch) => {
    dispatch(uiActions.tradeStart());
    try {
      const {
        data: { transaction, isDifferent, cart },
      } = await axios.patch('/transaction', { singleItem });

      dispatch(uiActions.tradeEnd());
      dispatch(setTransaction(transaction));
      if (cart) dispatch(setCart(cart));

      if (transaction.length > 0) {
        history.push('/transaction');
      } else if (singleItem) {
        history.goBack();
      }

      if (isDifferent) {
        if (singleItem) {
          if (transaction.length > 0) {
            dispatch(
              uiActions.setAndDeleteMessage('Available quantity of this product changed meanwhile'),
            );
          } else {
            dispatch(uiActions.setAndDeleteMessage('Sorry, this product does not exist any more'));
          }
        } else if (transaction.length > 0) {
          dispatch(uiActions.setAndDeleteMessage('Availability of the products changed meanwhile'));
        } else {
          dispatch(
            uiActions.setAndDeleteMessage(
              'Sorry, all the products from cart are not available anymore',
            ),
          );
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};
