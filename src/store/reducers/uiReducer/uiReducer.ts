import { Reducer } from 'redux';
import { updateObject } from '../../../shared/utility/utility';
import { defaultProductsPerPage } from '../../../shared/constants';
import { ModalType } from '../../../shared/types/types';
import { UiAction } from '../../actions/uiActions/uiActionTypes';

export interface UiReducerState {
  isFormLoading: boolean;
  formError: string;
  isDataLoading: boolean;
  isCartLoading: boolean;
  message: string;
  modalContent: ModalType | null;
  productsPerPage: number;
}

export const initialUiReducerState: UiReducerState = {
  isFormLoading: false,
  formError: '',
  isDataLoading: false,
  isCartLoading: false,
  message: '',
  modalContent: null,
  productsPerPage: defaultProductsPerPage,
};

type FormStartAction = {
  type: UiAction.FORM_START;
};
const formStart = (state: UiReducerState) => {
  return updateObject(state, { isFormLoading: true });
};

type FormSuccessAction = {
  type: UiAction.FORM_SUCCESS;
};
const formSuccess = (state: UiReducerState) => {
  return updateObject(state, {
    isFormLoading: false,
    formError: '',
    modalContent: null,
  });
};

type FormFailAction = {
  type: UiAction.FORM_FAIL;
  error: string;
};
const formFail = (state: UiReducerState, action: FormFailAction) => {
  return updateObject(state, { isFormLoading: false, formError: action.error });
};

type DataStartAction = {
  type: UiAction.DATA_START;
};
const dataStart = (state: UiReducerState) => {
  return updateObject(state, { isDataLoading: true });
};

type DataEndAction = {
  type: UiAction.DATA_END;
};
const dataEnd = (state: UiReducerState) => {
  return updateObject(state, { isDataLoading: false });
};

type TradeStartAction = {
  type: UiAction.TRADE_START;
};
const tradeStart = (state: UiReducerState) => {
  return updateObject(state, { isCartLoading: true });
};

type TradeEndAction = {
  type: UiAction.TRADE_END;
};
const tradeEnd = (state: UiReducerState) => {
  return updateObject(state, { isCartLoading: false });
};

type SetMessageAction = {
  type: UiAction.SET_MESSAGE;
  message: string;
};
const setMessage = (state: UiReducerState, action: SetMessageAction) => {
  return updateObject(state, { message: action.message });
};

type SetModalAction = {
  type: UiAction.SET_MODAL;
  modalContent: ModalType | null;
};
const setModal = (state: UiReducerState, action: SetModalAction) => {
  if (
    (state.isFormLoading && !action.modalContent) ||
    (!state.modalContent && !action.modalContent)
  ) {
    return state;
  }
  return updateObject(state, {
    modalContent: action.modalContent,
    formError: '',
  });
};

type SetProductsPerPageAction = {
  type: UiAction.SET_PRODUCTS_PER_PAGE;
  productsPerPage: number;
};
const setProductsPerPage = (state: UiReducerState, action: SetProductsPerPageAction) => {
  return updateObject(state, { productsPerPage: action.productsPerPage });
};

export type UiReducerAction =
  | FormStartAction
  | FormSuccessAction
  | FormFailAction
  | DataStartAction
  | DataEndAction
  | TradeStartAction
  | TradeEndAction
  | SetMessageAction
  | SetModalAction
  | SetProductsPerPageAction;
const uiReducer: Reducer<UiReducerState, UiReducerAction> = (
  // eslint-disable-next-line default-param-last
  state = initialUiReducerState,
  action,
): UiReducerState => {
  switch (action.type) {
    case UiAction.FORM_START:
      return formStart(state);
    case UiAction.FORM_SUCCESS:
      return formSuccess(state);
    case UiAction.FORM_FAIL:
      return formFail(state, action);
    case UiAction.DATA_START:
      return dataStart(state);
    case UiAction.DATA_END:
      return dataEnd(state);
    case UiAction.TRADE_START:
      return tradeStart(state);
    case UiAction.TRADE_END:
      return tradeEnd(state);
    case UiAction.SET_MESSAGE:
      return setMessage(state, action);
    case UiAction.SET_MODAL:
      return setModal(state, action);
    case UiAction.SET_PRODUCTS_PER_PAGE:
      return setProductsPerPage(state, action);
    default:
      return state;
  }
};

export default uiReducer;
