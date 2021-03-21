import * as actionTypes from '../../actions/actionTypes';
import uiReducer, { initialState } from './uiReducer';
import { modalTypes } from '../../../shared/constants';

describe('UI reducer', () => {
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

  it('should update isFormLoading, formError, isModalOpen and modalContent after FORM_SUCCESS', () => {
    const state = {
      ...initialState,
      isFormLoading: true,
      formError: 'test error',
      isModalOpen: true,
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
      isModalOpen: false,
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

  it('should set formError to empty string, isModalOpen to true and correct modalContent after SET_MODAL', () => {
    const state = {
      ...initialState,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        isModalOpen: true,
        modalContent: modalTypes.LOGIN,
      }),
    ).toEqual({
      ...initialState,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
      formError: '',
    });
  });

  it('should set formError and modalContent to empty string and isModalOpen to false after SET_MODAL', () => {
    const state = {
      ...initialState,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        isModalOpen: false,
      }),
    ).toEqual({
      ...initialState,
      isModalOpen: false,
      modalContent: '',
      formError: '',
    });
  });

  it('should NOT update state after SET_MODAL if isFormLoading is true and passed isModalOpen is false', () => {
    const state = {
      ...initialState,
      isModalOpen: true,
      isFormLoading: true,
      modalContent: modalTypes.LOGIN,
      formError: 'test error',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        isModalOpen: false,
      }),
    ).toEqual(state);
  });

  it('should NOT update state after SET_MODAL if state.isModalOpen is false and passed isModalOpen is false', () => {
    const state = {
      ...initialState,
      isModalOpen: false,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        isModalOpen: false,
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
