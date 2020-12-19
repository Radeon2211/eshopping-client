import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';
import { MAX_QUANTITY_PER_PAGE } from '../../../shared/constants';

export const initialState = {
  isFormLoading: false,
  formError: '',
  isDataLoading: false,
  dataError: '',
  isCartLoading: false,
  message: '',
  isModalOpen: false,
  modalContent: '',
  maxQuantityPerPage: MAX_QUANTITY_PER_PAGE,
};

const formStart = (state) => {
  return updateObject(state, { isFormLoading: true });
};

const formSuccess = (state) => {
  return updateObject(state, {
    isFormLoading: false,
    formError: '',
    isModalOpen: false,
    modalContent: '',
  });
};

const formFail = (state, action) => {
  return updateObject(state, { isFormLoading: false, formError: action.error });
};

const dataStart = (state) => {
  return updateObject(state, { isDataLoading: true });
};

const dataSuccess = (state) => {
  return updateObject(state, {
    isDataLoading: false,
    dataError: '',
  });
};

const dataFail = (state, action) => {
  return updateObject(state, { isDataLoading: false, dataError: action.error });
};

const cartStart = (state) => {
  return updateObject(state, { isCartLoading: true });
};

const cartEnd = (state) => {
  return updateObject(state, { isCartLoading: false });
};

const setMessage = (state, action) => {
  return updateObject(state, { message: action.message });
};

const deleteMessage = (state) => {
  return updateObject(state, { message: '' });
};

const setModal = (state, action) => {
  if (state.isFormLoading && !action.isModalOpen) return state;
  return updateObject(state, {
    isModalOpen: action.isModalOpen,
    modalContent: action.modalContent || '',
    formError: '',
  });
};

const setMaxQuantityPerPage = (state, action) => {
  return updateObject(state, { maxQuantityPerPage: action.maxQuantityPerPage });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORM_START:
      return formStart(state);
    case actionTypes.FORM_SUCCESS:
      return formSuccess(state);
    case actionTypes.FORM_FAIL:
      return formFail(state, action);
    case actionTypes.DATA_START:
      return dataStart(state);
    case actionTypes.DATA_SUCCESS:
      return dataSuccess(state);
    case actionTypes.DATA_FAIL:
      return dataFail(state, action);
    case actionTypes.CART_START:
      return cartStart(state);
    case actionTypes.CART_END:
      return cartEnd(state);
    case actionTypes.SET_MESSAGE:
      return setMessage(state, action);
    case actionTypes.DELETE_MESSAGE:
      return deleteMessage(state);
    case actionTypes.SET_MODAL:
      return setModal(state, action);
    case actionTypes.SET_MAX_QUANTITY_PER_PAGE:
      return setMaxQuantityPerPage(state, action);
    default:
      return state;
  }
};

export default uiReducer;
