import * as actionTypes from './actionTypes';

export const formStart = () => ({
  type: actionTypes.FORM_START,
});

export const formSuccess = (message) => ({
  type: actionTypes.FORM_SUCCESS,
  message,
});

export const formFail = (error) => ({
  type: actionTypes.FORM_FAIL,
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