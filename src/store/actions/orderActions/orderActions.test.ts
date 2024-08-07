import moxios from 'moxios';
import axios from '../../../axios';
import { defaultErrorMessage } from '../../../shared/constants';
import {
  checkReqMethodAndURL,
  createExpectedState,
  createOrder,
  setUpStoreWithDefaultProfile,
  testStore,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from '../uiActions/uiActions';
import * as orderActions from './orderActions';
import { AuthAction } from '../authActions/authActionTypes';
import { OrderType } from '../../../shared/types/types';

const defaultGetStateFn = testStore().store.getState;

describe('action creators', () => {
  it('tests setPlacedOrders()', () => {
    const placedOrders = [createOrder()];
    const orderCount = 1;
    const expectedAction = {
      type: AuthAction.SET_PLACED_ORDERS,
      placedOrders,
      orderCount,
    };
    expect(orderActions.setPlacedOrders(placedOrders, orderCount)).toEqual(expectedAction);
  });

  it('tests setSellHistory()', () => {
    const sellHistory = [createOrder()];
    const orderCount = 1;
    const expectedAction = {
      type: AuthAction.SET_SELL_HISTORY,
      sellHistory,
      orderCount,
    };
    expect(orderActions.setSellHistory(sellHistory, orderCount)).toEqual(expectedAction);
  });

  it('tests setOrderDetails()', () => {
    const orderDetails = createOrder();
    const expectedAction = {
      type: AuthAction.SET_ORDER_DETAILS,
      orderDetails,
    };
    expect(orderActions.setOrderDetails(orderDetails)).toEqual(expectedAction);
  });
});

describe('async functions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe('fetchOrders()', () => {
    const expectedOrders = [createOrder()];
    const defaultSearch = '?p=1';

    describe('store', () => {
      it('is successful and page number is 3 and type is PLACED_ORDERS', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            orders: expectedOrders,
            orderCount: 1,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchOrders('?p=3', OrderType.PLACED_ORDERS));

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            placedOrders: expectedOrders,
            orderCount: 1,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/orders?type=PLACED_ORDERS&p=3')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and page number is not given and sortBy is overallPrice:asc and type is SELL_HISTORY', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            orders: expectedOrders,
            orderCount: 1,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.fetchOrders('?sortBy=overallPrice:asc', OrderType.SELL_HISTORY),
        );

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            sellHistory: expectedOrders,
            orderCount: 1,
          }),
        );
        expect(
          checkReqMethodAndURL(
            moxios,
            'get',
            '/orders?type=SELL_HISTORY&p=1&sortBy=overallPrice%3Aasc',
          ),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed and type is PLACED_ORDERS', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchOrders(defaultSearch, OrderType.PLACED_ORDERS));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              placedOrders: null,
              orderCount: undefined,
            },
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/orders?type=PLACED_ORDERS&p=1')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed and type is SELL_HISTORY', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchOrders(defaultSearch, OrderType.SELL_HISTORY));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              sellHistory: null,
              orderCount: undefined,
            },
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/orders?type=SELL_HISTORY&p=1')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and type is PLACED_ORDERS', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            orders: expectedOrders,
            orderCount: 1,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.fetchOrders(defaultSearch, OrderType.PLACED_ORDERS)(
          innerDispatchFn,
          defaultGetStateFn,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          orderActions.setPlacedOrders(expectedOrders, 1),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is successful and type is SELL_HISTORY', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            orders: expectedOrders,
            orderCount: 1,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.fetchOrders(defaultSearch, OrderType.SELL_HISTORY)(
          innerDispatchFn,
          defaultGetStateFn,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          orderActions.setSellHistory(expectedOrders, 1),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed and type is PLACED_ORDERS', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchOrders(defaultSearch, OrderType.PLACED_ORDERS)(
          innerDispatchFn,
          defaultGetStateFn,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          orderActions.setPlacedOrders(null, undefined),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed and type is SELL_HISTORY', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchOrders(defaultSearch, OrderType.SELL_HISTORY)(
          innerDispatchFn,
          defaultGetStateFn,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          orderActions.setSellHistory(null, undefined),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('fetchOrderDetails()', () => {
    const orderId = 'o1';
    const expectedOrder = createOrder();

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            order: expectedOrder,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchOrderDetails(orderId));

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            orderDetails: expectedOrder,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'get', `/orders/${orderId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchOrderDetails(orderId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              orderDetails: null,
            },
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', `/orders/${orderId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 200,
          response: {
            order: expectedOrder,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.fetchOrderDetails(orderId)(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          orderActions.setOrderDetails(expectedOrder),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed', async () => {
        moxios.stubRequest(/orders.*/, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchOrderDetails(orderId)(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, orderActions.setOrderDetails(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });
});
