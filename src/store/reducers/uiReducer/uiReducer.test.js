import * as actionTypes from '../../actions/actionTypes';
import uiReducer from './uiReducer';
import { MAX_QUANTITY_PER_PAGE } from '../../../shared/constants';

describe('UI reducer', () => {
  it('Should return default state', () => {
    expect(uiReducer(undefined, {})).toEqual({
      isFormLoading: false,
      formError: '',
      isDataLoading: false,
      dataError: '',
      message: '',
      isModalOpen: false,
      modalContent: '',
      maxQuantityPerPage: MAX_QUANTITY_PER_PAGE,
    });
  });

  it('Should return new state if receiving type', () => {
    const error = 'test error';
    expect(
      uiReducer(undefined, {
        type: actionTypes.FORM_FAIL,
        error,
      }),
    ).toEqual({
      isFormLoading: false,
      formError: error,
      isDataLoading: false,
      dataError: '',
      message: '',
      isModalOpen: false,
      modalContent: '',
      maxQuantityPerPage: MAX_QUANTITY_PER_PAGE,
    });
  });
});
