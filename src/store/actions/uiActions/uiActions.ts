import queryString from 'query-string';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';
import { UiAction } from './uiActionTypes';
import { ModalType } from '../../../shared/types/types';
import { UiReducerState } from '../../reducers/uiReducer/uiReducer';

type DispatchExts = ThunkDispatch<UiReducerState, void, AnyAction>;

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

export const setAndDeleteMessage = (message: string) => {
  return (dispatch: DispatchExts) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
  };
};

export const writeChangeCartInfo = (condition: boolean) => {
  return (dispatch: DispatchExts) => {
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
) => {
  return (dispatch: DispatchExts) => {
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
