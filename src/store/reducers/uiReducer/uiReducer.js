import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility/utility';
import { PRODUCTS_PER_PAGE } from '../../../shared/constants';

export const initialState = {
  isFormLoading: false,
  formError: '',
  isDataLoading: false,
  isCartLoading: false,
  message: '',
  isModalOpen: false,
  modalContent: '',
  productsPerPage: PRODUCTS_PER_PAGE,
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

const dataEnd = (state) => {
  return updateObject(state, { isDataLoading: false });
};

const tradeStart = (state) => {
  return updateObject(state, { isCartLoading: true });
};

const tradeEnd = (state) => {
  return updateObject(state, { isCartLoading: false });
};

const setMessage = (state, action) => {
  return updateObject(state, { message: action.message });
};

const deleteMessage = (state) => {
  return updateObject(state, { message: '' });
};

const setModal = (state, action) => {
  if ((state.isFormLoading && !action.isModalOpen) || (!state.isModalOpen && !action.isModalOpen)) {
    return state;
  }
  return updateObject(state, {
    isModalOpen: action.isModalOpen,
    modalContent: action.modalContent || '',
    formError: '',
  });
};

const setProductsPerPage = (state, action) => {
  return updateObject(state, { productsPerPage: action.productsPerPage });
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
    case actionTypes.DATA_END:
      return dataEnd(state);
    case actionTypes.TRADE_START:
      return tradeStart(state);
    case actionTypes.TRADE_END:
      return tradeEnd(state);
    case actionTypes.SET_MESSAGE:
      return setMessage(state, action);
    case actionTypes.DELETE_MESSAGE:
      return deleteMessage(state);
    case actionTypes.SET_MODAL:
      return setModal(state, action);
    case actionTypes.SET_PRODUCTS_PER_PAGE:
      return setProductsPerPage(state, action);
    default:
      return state;
  }
};

export default uiReducer;
