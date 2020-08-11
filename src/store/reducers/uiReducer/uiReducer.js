import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  isFormLoading: false,
  formError: '',
  isListLoading: false,
  listError: '',
  message: '',
  isModalOpen: false,
  modalContent: '',
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

const listStart = (state) => {
  return updateObject(state, { isListLoading: true });
};

const listSuccess = (state) => {
  return updateObject(state, {
    isListLoading: false,
    listError: '',
  });
};

const listFail = (state, action) => {
  return updateObject(state, { isListLoading: false, listError: action.error });
};

const setMessage = (state, action) => {
  return updateObject(state, { message: action.message });
};

const deleteMessage = (state) => {
  return updateObject(state, { message: '' });
};

const setModal = (state, action) => {
  return updateObject(state, {
    isModalOpen: action.isModalOpen,
    modalContent: action.modalContent,
    formError: '',
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORM_START:
      return formStart(state);
    case actionTypes.FORM_SUCCESS:
      return formSuccess(state);
    case actionTypes.FORM_FAIL:
      return formFail(state, action);
    case actionTypes.LIST_START:
      return listStart(state);
    case actionTypes.LIST_SUCCESS:
      return listSuccess(state);
    case actionTypes.LIST_FAIL:
      return listFail(state, action);
    case actionTypes.SET_MESSAGE:
      return setMessage(state, action);
    case actionTypes.DELETE_MESSAGE:
      return deleteMessage(state);
    case actionTypes.SET_MODAL_OPEN_STATE:
      return setModal(state, action);
    default:
      return state;
  }
};

export default uiReducer;
