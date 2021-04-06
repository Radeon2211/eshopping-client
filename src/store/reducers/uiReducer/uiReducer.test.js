import * as actionTypes from '../../actions/actionTypes';
import uiReducer, { initialState } from './uiReducer';
import { modalTypes } from '../../../shared/constants';

describe('ui reducer', () => {
  it('should return initial state after passing empty object', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should set isFormLoading to true after FORM_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.FORM_START,
      }),
    ).toEqual({
      ...initialState,
      isFormLoading: true,
    });
  });

  it('should update isFormLoading, formError, modalContent after FORM_SUCCESS', () => {
    const state = {
      ...initialState,
      isFormLoading: true,
      formError: 'test error',
      modalContent: modalTypes.LOGIN,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.FORM_SUCCESS,
      }),
    ).toEqual({
      ...initialState,
      isFormLoading: false,
      formError: '',
      modalContent: '',
    });
  });

  it('should update isFormLoading and formError after FORM_FAIL', () => {
    const error = 'test error';
    const state = {
      ...initialState,
      isFormLoading: true,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.FORM_FAIL,
        error,
      }),
    ).toEqual({
      ...initialState,
      isFormLoading: false,
      formError: error,
    });
  });

  it('should set isDataLoading to true after DATA_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.DATA_START,
      }),
    ).toEqual({
      ...initialState,
      isDataLoading: true,
    });
  });

  it('should set isDataLoading to false after DATA_END', () => {
    const state = {
      ...initialState,
      isDataLoading: true,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.DATA_END,
      }),
    ).toEqual({
      ...initialState,
      isDataLoading: false,
    });
  });

  it('should set isCartLoading to true after TRADE_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.TRADE_START,
      }),
    ).toEqual({
      ...initialState,
      isCartLoading: true,
    });
  });

  it('should set isCartLoading to false after TRADE_END', () => {
    const state = {
      ...initialState,
      isCartLoading: true,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.TRADE_END,
      }),
    ).toEqual({
      ...initialState,
      isCartLoading: false,
    });
  });

  it('should set new message  after SET_MESSAGE', () => {
    const message = 'test message';
    expect(
      uiReducer(undefined, {
        type: actionTypes.SET_MESSAGE,
        message,
      }),
    ).toEqual({
      ...initialState,
      message,
    });
  });

  it('should set formError to empty string and correct modalContent after SET_MODAL', () => {
    const state = {
      ...initialState,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        modalContent: modalTypes.LOGIN,
      }),
    ).toEqual({
      ...initialState,
      modalContent: modalTypes.LOGIN,
      formError: '',
    });
  });

  it('should set formError and modalContent to empty string after SET_MODAL', () => {
    const state = {
      ...initialState,
      modalContent: modalTypes.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        modalContent: '',
      }),
    ).toEqual({
      ...initialState,
      modalContent: '',
      formError: '',
    });
  });

  it('should NOT update state after SET_MODAL if isFormLoading is true and modalContent is not empty', () => {
    const state = {
      ...initialState,
      isFormLoading: true,
      modalContent: modalTypes.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        modalContent: '',
      }),
    ).toEqual(state);
  });

  it('should NOT update state after SET_MODAL if state.modalContent is false and passed modalContent is false', () => {
    const state = {
      ...initialState,
      modalContent: false,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        modalContent: false,
      }),
    ).toEqual(state);
  });

  it('should set new productsPerPage after SET_PRODUCTS_PER_PAGE', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.SET_PRODUCTS_PER_PAGE,
        productsPerPage: 25,
      }),
    ).toEqual({
      ...initialState,
      productsPerPage: 25,
    });
  });
});
