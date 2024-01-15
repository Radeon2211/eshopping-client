import axios from '../../../axios';
import * as actionTypes from '../actionTypes';
import * as uiActions from '../uiActions/uiActions';
import { getErrorMessage } from '../../../shared/utility/utility';
import { modalTypes } from '../../../shared/constants';

let updateCartItemRequestCounter = 0;

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
    try {
      dispatch(uiActions.tradeStart());
      const { data } = await axios.get('/cart');
      dispatch(setCart(data.cart));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setCart(null));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const addCartItem = (item) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());
      const { data } = await axios.patch('/cart/add', item);
      dispatch(setCart(data.cart));
      dispatch(uiActions.setModal(modalTypes.CART_ITEM_ADDED));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const updateCartItem = (itemId, action, quantity) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());
      const quantityParam = quantity ? `&quantity=${quantity}` : '';
      updateCartItemRequestCounter += 1;
      const { data } = await axios.patch(`/cart/${itemId}/update?action=${action}${quantityParam}`);
      updateCartItemRequestCounter -= 1;
      if (updateCartItemRequestCounter <= 0) {
        dispatch(setCart(data.cart));
        dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
        dispatch(uiActions.tradeEnd());
      }
    } catch (error) {
      updateCartItemRequestCounter -= 1;
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());
      await axios.patch('/cart/clear');
      dispatch(setCart([]));
      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const removeCartItem = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());
      const { data } = await axios.patch(`/cart/${itemId}/remove`);
      dispatch(setCart(data.cart));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const goToTransaction = (navigateFn, singleItem) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());

      const {
        data: { transaction, isDifferent, cart },
      } = await axios.patch('/transaction', { singleItem });

      dispatch(setTransaction(transaction));
      if (cart) dispatch(setCart(cart));

      if (isDifferent) {
        if (singleItem) {
          if (transaction.length > 0) {
            dispatch(
              uiActions.setAndDeleteMessage('Available quantity of this product changed meanwhile'),
            );
          } else {
            dispatch(uiActions.setAndDeleteMessage('Sorry, this product does not exist anymore'));
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

      if (transaction.length > 0) {
        navigateFn('/transaction');
      } else if (singleItem) {
        navigateFn(-1);
      }

      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const buyProducts = (navigateFn, lastPath) => {
  return async (dispatch, getState) => {
    try {
      dispatch(uiActions.formStart());
      const { transaction, deliveryAddress } = getState().auth;

      let hasToClearCart = false;
      if (lastPath === '/cart') hasToClearCart = true;

      const {
        data: { transaction: updatedTransaction, cart },
      } = await axios.post('/orders', { transaction, deliveryAddress, clearCart: hasToClearCart });

      dispatch(setTransaction(updatedTransaction));
      dispatch(setCart(cart));

      if (updatedTransaction) {
        if (updatedTransaction.length > 0) {
          dispatch(
            uiActions.setAndDeleteMessage(
              'Availability of the products changed meanwhile. Check all the products in transaction and try again',
            ),
          );
        } else {
          dispatch(
            uiActions.setAndDeleteMessage('Sorry, these products are not available anymore'),
          );
          navigateFn('/cart', { replace: true });
        }
      } else {
        dispatch(uiActions.setAndDeleteMessage('Transaction was successful'));
        navigateFn('/my-account/placed-orders', { replace: true });
      }

      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.formSuccess());
    }
  };
};
