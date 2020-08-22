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

export const listStart = () => ({
  type: actionTypes.LIST_START,
});

export const listSuccess = () => ({
  type: actionTypes.LIST_SUCCESS,
});

export const listFail = (error) => ({
  type: actionTypes.LIST_FAIL,
  error,
});

export const setMessage = (message) => ({
  type: actionTypes.SET_MESSAGE,
  message,
});

export const deleteMessage = () => ({
  type: actionTypes.DELETE_MESSAGE,
});

export const setModal = (isModalOpen, modalContent) => ({
  type: actionTypes.SET_MODAL_OPEN_STATE,
  isModalOpen,
  modalContent,
});

export const setMaxQuantityPerPage = (quantity) => ({
  type: actionTypes.SET_MAX_QUANTITY_PER_PAGE,
  maxQuantityPerPage: quantity,
});

export const changeMaxQuantityPerPage = (quantity, history) => {
  return async (dispatch, getState) => {
    const currentMaxQuantityPerPage = getState().ui.maxQuantityPerPage;
    dispatch(setMaxQuantityPerPage(quantity));
    const { productCount } = getState().product;
    if (currentMaxQuantityPerPage >= productCount && quantity >= productCount) return;
    const parsedQueryParams = queryString.parse(history.location.search);
    const correctQueryParams = {
      ...parsedQueryParams,
      p: 1,
      limit: quantity,
    };
    const stringifiedQueryParams = queryString.stringify(correctQueryParams);
    history.push(`${history.location.pathname}?${stringifiedQueryParams}`);
  };
};
