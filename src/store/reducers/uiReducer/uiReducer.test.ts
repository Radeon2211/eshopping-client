import { ModalType } from '../../../shared/types/types';
import { UiAction } from '../../actions/uiActions/uiActionTypes';
import uiReducer, { initialUiReducerState } from './uiReducer';

describe('ui reducer', () => {
  it('should set isFormLoading to true after FORM_START', () => {
    expect(
      uiReducer(undefined, {
        type: UiAction.FORM_START,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isFormLoading: true,
    });
  });

  it('should update isFormLoading, formError, modalContent after FORM_SUCCESS', () => {
    const state = {
      ...initialUiReducerState,
      isFormLoading: true,
      formError: 'test error',
      modalContent: ModalType.LOGIN,
    };
    expect(
      uiReducer(state, {
        type: UiAction.FORM_SUCCESS,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isFormLoading: false,
      formError: '',
      modalContent: null,
    });
  });

  it('should update isFormLoading and formError after FORM_FAIL', () => {
    const error = 'test error';
    const state = {
      ...initialUiReducerState,
      isFormLoading: true,
    };
    expect(
      uiReducer(state, {
        type: UiAction.FORM_FAIL,
        error,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isFormLoading: false,
      formError: error,
    });
  });

  it('should set isDataLoading to true after DATA_START', () => {
    expect(
      uiReducer(undefined, {
        type: UiAction.DATA_START,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isDataLoading: true,
    });
  });

  it('should set isDataLoading to false after DATA_END', () => {
    const state = {
      ...initialUiReducerState,
      isDataLoading: true,
    };
    expect(
      uiReducer(state, {
        type: UiAction.DATA_END,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isDataLoading: false,
    });
  });

  it('should set isCartLoading to true after TRADE_START', () => {
    expect(
      uiReducer(undefined, {
        type: UiAction.TRADE_START,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isCartLoading: true,
    });
  });

  it('should set isCartLoading to false after TRADE_END', () => {
    const state = {
      ...initialUiReducerState,
      isCartLoading: true,
    };
    expect(
      uiReducer(state, {
        type: UiAction.TRADE_END,
      }),
    ).toEqual({
      ...initialUiReducerState,
      isCartLoading: false,
    });
  });

  it('should set new message  after SET_MESSAGE', () => {
    const message = 'test message';
    expect(
      uiReducer(undefined, {
        type: UiAction.SET_MESSAGE,
        message,
      }),
    ).toEqual({
      ...initialUiReducerState,
      message,
    });
  });

  it('should set formError to empty string and correct modalContent after SET_MODAL', () => {
    const state = {
      ...initialUiReducerState,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: UiAction.SET_MODAL,
        modalContent: ModalType.LOGIN,
      }),
    ).toEqual({
      ...initialUiReducerState,
      modalContent: ModalType.LOGIN,
      formError: '',
    });
  });

  it('should set formError and modalContent to empty string after SET_MODAL', () => {
    const state = {
      ...initialUiReducerState,
      modalContent: ModalType.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: UiAction.SET_MODAL,
        modalContent: null,
      }),
    ).toEqual({
      ...initialUiReducerState,
      modalContent: null,
      formError: '',
    });
  });

  it('should NOT update state after SET_MODAL if isFormLoading is true and modalContent is not empty', () => {
    const state = {
      ...initialUiReducerState,
      isFormLoading: true,
      modalContent: ModalType.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: UiAction.SET_MODAL,
        modalContent: null,
      }),
    ).toEqual(state);
  });

  it('should set new productsPerPage after SET_PRODUCTS_PER_PAGE', () => {
    expect(
      uiReducer(undefined, {
        type: UiAction.SET_PRODUCTS_PER_PAGE,
        productsPerPage: 25,
      }),
    ).toEqual({
      ...initialUiReducerState,
      productsPerPage: 25,
    });
  });
});
