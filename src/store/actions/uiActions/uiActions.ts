import queryString from 'query-string';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';
import { UiAction } from './uiActionTypes';
import { ModalType } from '../../../shared/types/types';
import { TypedThunkAction } from '../../reducers/rootReducer';

export const formStart = () => ({
  type: UiAction.FORM_START,
});

export const formSuccess = () => ({
  type: UiAction.FORM_SUCCESS,
});

export const formFail = (error = '') => ({
  type: UiAction.FORM_FAIL,
  error,
});

export const dataStart = () => ({
  type: UiAction.DATA_START,
});

export const dataEnd = () => ({
  type: UiAction.DATA_END,
});

export const tradeStart = () => ({
  type: UiAction.TRADE_START,
});

export const tradeEnd = () => ({
  type: UiAction.TRADE_END,
});

export const setMessage = (message: string) => ({
  type: UiAction.SET_MESSAGE,
  message,
});

export const setModal = (modalContent: ModalType | null) => ({
  type: UiAction.SET_MODAL,
  modalContent,
});

export const setProductsPerPage = (quantity: number) => ({
  type: UiAction.SET_PRODUCTS_PER_PAGE,
  productsPerPage: quantity,
});

export const setAndDeleteMessage = (message: string): ((dispatch: Dispatch<AnyAction>) => void) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
  };
};

export const writeChangeCartInfo = (condition: boolean): TypedThunkAction => {
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

export const changeProductsPerPage = (
  quantity: number,
  pathname: string,
  search: string,
  navigateFn: NavigateFunction,
): TypedThunkAction => {
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
