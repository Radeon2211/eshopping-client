import {
  createExpectedState,
  setUpStoreWithDefaultProfile,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from './uiActions';
import * as actionTypes from '../actionTypes';
import { modalTypes } from '../../../shared/constants';

describe('Action creators', () => {
  it('tests formStart()', () => {
    const expectedAction = {
      type: actionTypes.FORM_START,
    };
    expect(uiActions.formStart()).toEqual(expectedAction);
  });

  it('tests formSuccess()', () => {
    const expectedAction = {
      type: actionTypes.FORM_SUCCESS,
    };
    expect(uiActions.formSuccess()).toEqual(expectedAction);
  });

  describe('formFail()', () => {
    it('should return with empty string error by default', () => {
      const expectedAction = {
        type: actionTypes.FORM_FAIL,
        error: '',
      };
      expect(uiActions.formFail()).toEqual(expectedAction);
    });

    it('should return with given error', () => {
      const error = 'test error';
      const expectedAction = {
        type: actionTypes.FORM_FAIL,
        error,
      };
      expect(uiActions.formFail(error)).toEqual(expectedAction);
    });
  });

  it('tests dataStart()', () => {
    const expectedAction = {
      type: actionTypes.DATA_START,
    };
    expect(uiActions.dataStart()).toEqual(expectedAction);
  });

  it('tests dataEnd()', () => {
    const expectedAction = {
      type: actionTypes.DATA_END,
    };
    expect(uiActions.dataEnd()).toEqual(expectedAction);
  });

  it('tests tradeStart()', () => {
    const expectedAction = {
      type: actionTypes.TRADE_START,
    };
    expect(uiActions.tradeStart()).toEqual(expectedAction);
  });

  it('tests tradeEnd()', () => {
    const expectedAction = {
      type: actionTypes.TRADE_END,
    };
    expect(uiActions.tradeEnd()).toEqual(expectedAction);
  });

  it('tests setMessage()', () => {
    const message = 'test message';
    const expectedAction = {
      type: actionTypes.SET_MESSAGE,
      message,
    };
    expect(uiActions.setMessage(message)).toEqual(expectedAction);
  });

  describe('setModal()', () => {
    it('should return isModalOpen true and given modalContent', () => {
      const isModalOpen = true;
      const modalContent = modalTypes.CHANGE_EMAIL;
      const expectedAction = {
        type: actionTypes.SET_MODAL,
        isModalOpen,
        modalContent,
      };
      expect(uiActions.setModal(isModalOpen, modalContent)).toEqual(expectedAction);
    });

    it('should return isModalOpen false and empty modalContent by default', () => {
      const isModalOpen = false;
      const expectedAction = {
        type: actionTypes.SET_MODAL,
        isModalOpen,
        modalContent: '',
      };
      expect(uiActions.setModal(isModalOpen)).toEqual(expectedAction);
    });
  });

  it('tests setProductsPerPage()', () => {
    const quantity = 15;
    const expectedAction = {
      type: actionTypes.SET_PRODUCTS_PER_PAGE,
      productsPerPage: quantity,
    };
    expect(uiActions.setProductsPerPage(quantity)).toEqual(expectedAction);
  });
});

describe('Functions with dispatch', () => {
  describe('setAndDeleteMessage()', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern');
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    describe('Store', () => {
      it('should update message after 5000ms but NOT after 4999ms', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        store.dispatch(uiActions.setAndDeleteMessage('test message'));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'test message',
            },
          ),
        );

        jest.advanceTimersByTime(4999);
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'test message',
            },
          ),
        );

        jest.advanceTimersByTime(1);
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: '',
            },
          ),
        );
      });
    });

    describe('Inner dispatch', () => {
      it('should dispatch 2 times setMessage()', () => {
        const innerDispatchFn = jest.fn();
        uiActions.setAndDeleteMessage('test message')(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenCalledWith(uiActions.setMessage('test message'));
        jest.advanceTimersByTime(5000);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.setMessage(''));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('writeChangeCartInfo()', () => {
    describe('Store', () => {
      it('should change message if condition is true', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        store.dispatch(uiActions.writeChangeCartInfo(true));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
      });

      it('should NOT change message if condition is false', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        store.dispatch(uiActions.writeChangeCartInfo(false));
        expect(store.getState()).toEqual(createExpectedState(initialState));
      });
    });

    describe('Inner dispatch', () => {
      it('should call 1 time inner dispatch if condition is true', async () => {
        const innerDispatchFn = jest.fn();
        await uiActions.writeChangeCartInfo(true)(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenCalledTimes(1);
      });

      it('should NOT call inner dispatch if condition is false', () => {
        const innerDispatchFn = jest.fn();
        uiActions.writeChangeCartInfo(false)(innerDispatchFn);
        expect(innerDispatchFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('changeProductsPerPage()', () => {
    const createHistory = (pushFn = jest.fn(), search = '?p=1', pathname = '/products') => ({
      push: pushFn,
      location: { pathname, search },
    });

    describe('Store', () => {
      it('should only change productsPerPage if page number is 1', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        const pushFn = jest.fn();
        const history = createHistory(pushFn, '?p=1');
        store.dispatch(actions.changeProductsPerPage(15, history));

        expect(pushFn).not.toHaveBeenCalled();
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              productsPerPage: 15,
            },
          ),
        );
      });

      it('should change productsPerPage and also call push if page number is other than 1', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        const pushFn = jest.fn();
        const history = createHistory(pushFn, '?p=2&minPrice=100', '/products');
        store.dispatch(actions.changeProductsPerPage(20, history));

        expect(pushFn).toHaveBeenCalledWith('/products?minPrice=100&p=1');
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              productsPerPage: 20,
            },
          ),
        );
      });
    });

    describe('Inner dispatch', () => {
      it('should call inner dispatch', () => {
        const innerDispatchFn = jest.fn();
        const history = createHistory(jest.fn(), '?p=2');
        actions.changeProductsPerPage(5, history)(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenCalledWith(uiActions.setProductsPerPage(5));
      });
    });
  });
});
