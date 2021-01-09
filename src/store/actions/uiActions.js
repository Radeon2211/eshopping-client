import queryString from 'query-string';
import * as actionTypes from './actionTypes';

export const formStart = () => ({
  type: actionTypes.FORM_START,
});

export const formSuccess = () => ({
  type: actionTypes.FORM_SUCCESS,
});

export const formFail = (error) => ({
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

export const deleteMessage = () => ({
  type: actionTypes.DELETE_MESSAGE,
});

export const setModal = (isModalOpen, modalContent = '') => ({
  type: actionTypes.SET_MODAL,
  isModalOpen,
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
      dispatch(deleteMessage());
    }, 5000);
  };
};

export const writeChangeCartInfo = (condition) => {
  return (dispatch) => {
    if (condition) {
      dispatch(
        setAndDeleteMessage(
          'Some product in cart does not exist any more or their quantity has been changed',
        ),
      );
    }
  };
};

export const changeProductsPerPage = (quantity, history) => {
  return async (dispatch) => {
    dispatch(setProductsPerPage(quantity));
    const parsedQueryParams = queryString.parse(history.location.search);
    if (+parsedQueryParams.p !== 1) {
      const correctQueryParams = {
        ...parsedQueryParams,
        p: 1,
      };
      const stringifiedQueryParams = queryString.stringify(correctQueryParams);
      history.push(`${history.location.pathname}?${stringifiedQueryParams}`);
    }
  };
};
