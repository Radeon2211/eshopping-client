import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isFormLoading: false,
  message: '',
  formError: '',
  isModalOpen: false,
  modalContent: '',
};

const formStart = (state) => {
  return updateObject(state, { isFormLoading: true });
};

const formSuccess = (state, action) => {
  return updateObject(state, { isFormLoading: false, formError: '', message: action.message, isModalOpen: false, modalContent: '' });
};

const formFail = (state, action) => {
  return updateObject(state, { isFormLoading: false, formError: action.error, message: null });
};

const deleteMessage = (state) => {
  return updateObject(state, { message: '' });
};

const setModal = (state, action) => {
  return updateObject(state, { isModalOpen: action.isModalOpen, modalContent: action.modalContent, formError: '' });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORM_START:
      return formStart(state, action);
    case actionTypes.FORM_SUCCESS:
      return formSuccess(state, action);
    case actionTypes.FORM_FAIL:
      return formFail(state, action);
    case actionTypes.DELETE_MESSAGE:
      return deleteMessage(state, action);
    case actionTypes.SET_MODAL_OPEN_STATE:
      return setModal(state, action);
    default:
      return state;
  }
};

export default uiReducer;
