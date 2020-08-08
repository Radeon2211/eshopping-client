import * as actionTypes from '../../actions/actionTypes';
import uiReducer from './uiReducer';

describe('UI reducer', () => {
  it('Should return default state', () => {
    expect(uiReducer(undefined, {})).toEqual({
      isFormLoading: false,
      message: '',
      formError: '',
      isModalOpen: false,
      modalContent: '',
    });
  });

  it('Should return new state if receiving type', () => {
    const error = 'test error';
    expect(uiReducer(undefined, {
      type: actionTypes.FORM_FAIL,
      error,
    })).toEqual({
      isFormLoading: false,
      message: '',
      formError: error,
      isModalOpen: false,
      modalContent: '',
    });
  });
});