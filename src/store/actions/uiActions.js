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

export const dataSuccess = () => ({
  type: actionTypes.DATA_SUCCESS,
});

export const dataFail = (error) => ({
  type: actionTypes.DATA_FAIL,
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
  return async (dispatch) => {
    dispatch(setMaxQuantityPerPage(quantity));
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
