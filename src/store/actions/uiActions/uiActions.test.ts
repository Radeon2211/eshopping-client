import {
  createExpectedState,
  setUpStoreWithDefaultProfile,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from './uiActions';
import { ModalType } from '../../../shared/types/types';
import { UiAction } from './uiActionTypes';

describe('action creators', () => {
  it('tests formStart()', () => {
    const expectedAction = {
      type: UiAction.FORM_START,
    };
    expect(uiActions.formStart()).toEqual(expectedAction);
  });

  it('tests formSuccess()', () => {
    const expectedAction = {
      type: UiAction.FORM_SUCCESS,
    };
    expect(uiActions.formSuccess()).toEqual(expectedAction);
  });

  describe('formFail()', () => {
    it('should return with empty string error by default', () => {
      const expectedAction = {
        type: UiAction.FORM_FAIL,
        error: '',
      };
      expect(uiActions.formFail()).toEqual(expectedAction);
    });

    it('should return with given error', () => {
      const error = 'test error';
      const expectedAction = {
        type: UiAction.FORM_FAIL,
        error,
      };
      expect(uiActions.formFail(error)).toEqual(expectedAction);
    });
  });

  it('tests dataStart()', () => {
    const expectedAction = {
      type: UiAction.DATA_START,
    };
    expect(uiActions.dataStart()).toEqual(expectedAction);
  });

  it('tests dataEnd()', () => {
    const expectedAction = {
      type: UiAction.DATA_END,
    };
    expect(uiActions.dataEnd()).toEqual(expectedAction);
  });

  it('tests tradeStart()', () => {
    const expectedAction = {
      type: UiAction.TRADE_START,
    };
    expect(uiActions.tradeStart()).toEqual(expectedAction);
  });

  it('tests tradeEnd()', () => {
    const expectedAction = {
      type: UiAction.TRADE_END,
    };
    expect(uiActions.tradeEnd()).toEqual(expectedAction);
  });

  it('tests setMessage()', () => {
    const message = 'test message';
    const expectedAction = {
      type: UiAction.SET_MESSAGE,
      message,
    };
    expect(uiActions.setMessage(message)).toEqual(expectedAction);
  });

  describe('setModal()', () => {
    it('should return given modalContent', () => {
      const modalContent = ModalType.CHANGE_EMAIL;
      const expectedAction = {
        type: UiAction.SET_MODAL,
        modalContent,
      };
      expect(uiActions.setModal(modalContent)).toEqual(expectedAction);
    });

    it('should return empty modalContent by default', () => {
      const expectedAction = {
        type: UiAction.SET_MODAL,
        modalContent: null,
      };
      expect(uiActions.setModal(null)).toEqual(expectedAction);
    });
  });

  it('tests setProductsPerPage()', () => {
    const quantity = 15;
    const expectedAction = {
      type: UiAction.SET_PRODUCTS_PER_PAGE,
      productsPerPage: quantity,
    };
    expect(uiActions.setProductsPerPage(quantity)).toEqual(expectedAction);
  });
});

describe('functions with dispatch', () => {
  describe('setAndDeleteMessage()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe('store', () => {
      it('should update message after 5000ms but NOT after 4999ms', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
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

    describe('inner dispatch', () => {
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
    describe('store', () => {
      it('should change message if condition is true', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
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
        // @ts-expect-error TBF after redux upgrade
        store.dispatch(uiActions.writeChangeCartInfo(false));
        expect(store.getState()).toEqual(createExpectedState(initialState));
      });
    });

    describe('inner dispatch', () => {
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
    const createLocation = (search = '?p=1', pathname = '/products') => ({
      pathname,
      search,
    });

    describe('store', () => {
      it('should only change productsPerPage if page number is 1', () => {
        const { store, initialState } = setUpStoreWithDefaultProfile();
        const location = createLocation('?p=1');
        const navigateFn = jest.fn();
        store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.changeProductsPerPage(15, location.pathname, location.search, navigateFn),
        );

        expect(navigateFn).not.toHaveBeenCalled();
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
        const location = createLocation('?p=2&minPrice=100', '/products');
        const navigateFn = jest.fn();
        store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.changeProductsPerPage(20, location.pathname, location.search, navigateFn),
        );

        expect(navigateFn).toHaveBeenCalledWith('/products?minPrice=100&p=1');
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

    describe('inner dispatch', () => {
      it('should call inner dispatch', () => {
        const innerDispatchFn = jest.fn();
        const location = createLocation('?p=2');
        actions.changeProductsPerPage(
          5,
          location.pathname,
          location.search,
          jest.fn(),
        )(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenCalledWith(uiActions.setProductsPerPage(5));
      });
    });
  });
});
