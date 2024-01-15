import queryString from 'query-string';
import * as actionTypes from '../actionTypes';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';

export const formStart = () => ({
  type: actionTypes.FORM_START,
});

export const formSuccess = () => ({
  type: actionTypes.FORM_SUCCESS,
});

export const formFail = (error = '') => ({
  type: actionTypes.FORM_FAIL,
  error,
});

export const dataStart = () => ({
  type: actionTypes.DATA_START,
});

export const dataEnd = () => ({
  type: actionTypes.DATA_END,
});

export const tradeStart = () => ({
  type: actionTypes.TRADE_START,
});

export const tradeEnd = () => ({
  type: actionTypes.TRADE_END,
});

export const setMessage = (message) => ({
  type: actionTypes.SET_MESSAGE,
  message,
});

export const setModal = (modalContent = '') => ({
  type: actionTypes.SET_MODAL,
  modalContent,
});

export const setProductsPerPage = (quantity) => ({
  type: actionTypes.SET_PRODUCTS_PER_PAGE,
  productsPerPage: quantity,
});

export const setAndDeleteMessage = (message) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
  };
};

export const writeChangeCartInfo = (condition) => {
  return (dispatch) => {
    if (condition) {
      dispatch(
        setAndDeleteMessage(
          'Some product in cart does not exist any more or its quantity has been changed',
        ),
      );
    }
  };
};

export const changeProductsPerPage = (quantity, pathname, search, navigateFn) => {
  return (dispatch) => {
    dispatch(setProductsPerPage(quantity));
    const parsedQueryParams = getParamsWithoutPollution(search);
    if (+parsedQueryParams.p !== 1) {
      const correctQueryParams = {
        ...parsedQueryParams,
        p: 1,
      };
      const stringifiedQueryParams = queryString.stringify(correctQueryParams);
      navigateFn(`${pathname}?${stringifiedQueryParams}`);
    }
  };
};
