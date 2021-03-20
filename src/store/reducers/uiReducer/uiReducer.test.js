import * as actionTypes from '../../actions/actionTypes';
import uiReducer, { initialState } from './uiReducer';
import { modalTypes } from '../../../shared/constants';

describe('UI reducer', () => {
  it('should return default state', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return new state after FORM_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.FORM_START,
      }),
    ).toEqual({
      ...initialState,
      isFormLoading: true,
    });
  });

  it('should return new state after FORM_SUCCESS', () => {
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

  it('should return new state after FORM_FAIL', () => {
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

  it('should return new state after DATA_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.DATA_START,
      }),
    ).toEqual({
      ...initialState,
      isDataLoading: true,
    });
  });

  it('should return new state after DATA_END', () => {
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

  it('should return new state after TRADE_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.TRADE_START,
      }),
    ).toEqual({
      ...initialState,
      isCartLoading: true,
    });
  });

  it('should return new state after TRADE_END', () => {
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

  it('should return new state after SET_MESSAGE', () => {
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

  it('should return new state after DELETE_MESSAGE', () => {
    const state = {
      ...initialState,
      message: 'test message',
    };
    expect(
      uiReducer(state, {
        type: actionTypes.DELETE_MESSAGE,
      }),
    ).toEqual({
      ...initialState,
      message: '',
    });
  });

  it('should return new state after SET_MODAL (set to true with login content)', () => {
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

  it('should return new state after SET_MODAL (set to false)', () => {
    const state = {
      ...initialState,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
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
    });
  });

  it('should return new state after SET_MODAL (set to false)', () => {
    const state = {
      ...initialState,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
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
    });
  });

  it('should NOT return new state after SET_MODAL (NOT set to false if isFormLoading: true)', () => {
    const state = {
      ...initialState,
      isFormLoading: true,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
    };
    expect(
      uiReducer(state, {
        type: actionTypes.SET_MODAL,
        isModalOpen: false,
      }),
    ).toEqual({
      ...initialState,
      isFormLoading: true,
      isModalOpen: true,
      modalContent: modalTypes.LOGIN,
    });
  });

  it('should return new state after SET_PRODUCTS_PER_PAGE', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.SET_PRODUCTS_PER_PAGE,
        productsPerPage: 15,
      }),
    ).toEqual({
      ...initialState,
      productsPerPage: 15,
    });
  });
});
