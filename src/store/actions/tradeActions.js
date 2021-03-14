import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility/utility';
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
    try {
      dispatch(uiActions.tradeStart());
      const { data } = await axios.get('/cart');
      dispatch(setCart(data.cart));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.tradeEnd());
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
    try {
      dispatch(uiActions.tradeStart());
      const { data } = await axios.patch('/cart/add', item);
      dispatch(setCart(data.cart));
      dispatch(uiActions.setModal(true, modalTypes.CART_ITEM_ADDED));
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
      updateCartItemReqCounter += 1;
      const quantityParam = quantity ? `&quantity=${quantity}` : '';
      const { data } = await axios.patch(`/cart/${itemId}/update?action=${action}${quantityParam}`);
      updateCartItemReqCounter -= 1;
      if (updateCartItemReqCounter <= 0) {
        dispatch(setCart(data.cart));
        dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
        dispatch(uiActions.tradeEnd());
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

export const goToTransaction = (history, singleItem) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.tradeStart());
      const {
        data: { transaction, isDifferent, cart },
      } = await axios.patch('/transaction', { singleItem });

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

      dispatch(uiActions.tradeEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.tradeEnd());
    }
  };
};

export const buyProducts = (history, lastPath) => {
  return async (dispatch, getState) => {
    try {
      dispatch(uiActions.formStart());
      const { transaction, deliveryAddress } = getState().auth;

      let clearCartBool = false;
      if (lastPath === '/cart') clearCartBool = true;

      const {
        data: { transaction: updatedTransaction, cart },
      } = await axios.post('/orders', { transaction, deliveryAddress, clearCart: clearCartBool });

      dispatch(setCart(cart));

      if (updatedTransaction) {
        if (updatedTransaction.length > 0) {
          dispatch(
            uiActions.setAndDeleteMessage(
              'Availability of the products changed meanwhile. Check all the products in transaction and try again',
            ),
          );
        } else {
          dispatch(uiActions.setAndDeleteMessage('Sorry, these products do not exist any more'));
        }
      } else {
        dispatch(uiActions.setAndDeleteMessage('Transaction was successful'));
        history.replace('/my-account/placed-orders');
      }

      dispatch(setTransaction(updatedTransaction || []));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};
