import moxios from 'moxios';
import axios from '../../../axios';
import { defaultErrorMessage, modalTypes, updateCartActions } from '../../../shared/constants';
import {
  checkReqMethodAndURL,
  createExpectedState,
  setUpStoreWithDefaultProfile,
  createCartItem,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from '../uiActions/uiActions';
import * as tradeActions from './tradeActions';
import * as actionTypes from '../actionTypes';

describe('action creators', () => {
  it('tests setCart()', () => {
    const cart = [createCartItem()];
    const expectedAction = {
      type: actionTypes.SET_CART,
      cart,
    };
    expect(tradeActions.setCart(cart)).toEqual(expectedAction);
  });

  it('tests setTransaction()', () => {
    const transaction = [createTransactionAndOrderProdItem()];
    const expectedAction = {
      type: actionTypes.SET_TRANSACTION,
      transaction,
    };
    expect(tradeActions.setTransaction(transaction)).toEqual(expectedAction);
  });
});

describe('async functions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe('fetchCart()', () => {
    const expectedCart = [createCartItem()];

    describe('store', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.fetchCart());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              cart: expectedCart,
            },
            {},
            {
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/cart')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/cart', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.fetchCart());

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            cart: expectedCart,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/cart')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/cart', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.fetchCart());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              cart: null,
            },
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/cart')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchCart()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/cart', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchCart()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is failed', async () => {
        moxios.stubRequest('/cart', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchCart()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('addCartItem()', () => {
    const productId = 'p1';
    const productQuantity = 3;
    const itemToPass = {
      product: productId,
      quantity: productQuantity,
    };

    const expectedCart = [
      createCartItem({
        productId,
        productQuantity,
      }),
    ];

    describe('store', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart/add', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.addCartItem(itemToPass));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              cart: expectedCart,
            },
            {},
            {
              modalContent: modalTypes.CART_ITEM_ADDED,
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/cart/add')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(itemToPass);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/cart/add', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.addCartItem(itemToPass));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              cart: expectedCart,
            },
            {},
            {
              modalContent: modalTypes.CART_ITEM_ADDED,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/cart/add')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(itemToPass);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/cart/add', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.addCartItem(itemToPass));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/cart/add')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(itemToPass);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart/add', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addCartItem()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          uiActions.setModal(modalTypes.CART_ITEM_ADDED),
        );
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(5);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/cart/add', {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addCartItem()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          uiActions.setModal(modalTypes.CART_ITEM_ADDED),
        );
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(5);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is failed', async () => {
        moxios.stubRequest('/cart/add', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addCartItem()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('updateCartItem()', () => {
    const itemId = 'i1';
    const expectedCart = [
      createCartItem({
        id: itemId,
      }),
    ];

    describe('store', () => {
      describe('increment quantity', () => {
        it('is successful and isDifferent is true', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: true,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.INCREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                cart: expectedCart,
              },
              {},
              {
                message:
                  'Some product in cart does not exist any more or its quantity has been changed',
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.INCREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and isDifferent is false', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: false,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.INCREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              cart: expectedCart,
            }),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.INCREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is failed', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.INCREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.INCREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });

      describe('decrement quantity', () => {
        it('is successful and isDifferent is true', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: true,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.DECREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                cart: expectedCart,
              },
              {},
              {
                message:
                  'Some product in cart does not exist any more or its quantity has been changed',
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.DECREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and isDifferent is false', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: false,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.DECREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              cart: expectedCart,
            }),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.DECREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is failed', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.DECREMENT));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.DECREMENT}`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });

      describe('change quantity with exact value', () => {
        it('is successful and isDifferent is true and quantity is 1', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: true,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.NUMBER, 1));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                cart: expectedCart,
              },
              {},
              {
                message:
                  'Some product in cart does not exist any more or its quantity has been changed',
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.NUMBER}&quantity=1`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and isDifferent is false and quantity is 5', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 200,
            response: {
              cart: expectedCart,
              isDifferent: false,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.NUMBER, 5));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              cart: expectedCart,
            }),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.NUMBER}&quantity=5`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is failed and quantity is 10', async () => {
          moxios.stubRequest(/cart.*/, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.updateCartItem(itemId, updateCartActions.NUMBER, 10));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(
            checkReqMethodAndURL(
              moxios,
              'patch',
              `/cart/${itemId}/update?action=${updateCartActions.NUMBER}&quantity=10`,
            ),
          ).toEqual(true);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });
    });

    describe('inner dispatch (increment everywhere)', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest(/cart.*/, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.updateCartItem(itemId, updateCartActions.INCREMENT)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest(/cart.*/, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.updateCartItem(itemId, updateCartActions.INCREMENT)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is failed', async () => {
        moxios.stubRequest(/cart.*/, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.updateCartItem(itemId, updateCartActions.INCREMENT)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('clearCart()', () => {
    const defaultCart = [createCartItem()];

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/cart/clear', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile({
          cart: defaultCart,
        });
        await store.dispatch(actions.clearCart());

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            cart: [],
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', `/cart/clear`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/cart/clear', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile({
          cart: defaultCart,
        });
        await store.dispatch(actions.clearCart());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', `/cart/clear`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart/clear', {
          status: 200,
        });

        const innerDispatchFn = jest.fn();
        await actions.clearCart()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart([]));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/cart/clear', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.clearCart()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('removeCartItem()', () => {
    const itemId = 'i1';
    const expectedCart = [createCartItem()];

    describe('store', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.removeCartItem(itemId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              cart: expectedCart,
            },
            {},
            {
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', `/cart/${itemId}/remove`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.removeCartItem(itemId));

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            cart: expectedCart,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', `/cart/${itemId}/remove`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.removeCartItem(itemId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', `/cart/${itemId}/remove`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: true,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.removeCartItem(itemId)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 200,
          response: {
            cart: expectedCart,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.removeCartItem(itemId)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setCart(expectedCart));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is failed', async () => {
        moxios.stubRequest(`/cart/${itemId}/remove`, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.removeCartItem(itemId)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('goToTransaction()', () => {
    const createHistory = () => ({
      push: jest.fn(),
      goBack: jest.fn(),
    });
    const defaultHistory = createHistory();

    const expectedTransaction = [createTransactionAndOrderProdItem()];
    const expectedCart = [
      createCartItem({
        id: 'i2',
      }),
    ];

    const singleItemToPass = {
      product: 'p1',
      quantity: 3,
    };

    describe('store', () => {
      describe('single item is passed', () => {
        it('is successful and transaction length is 1, isDifferent is true, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: true,
              cart: null,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory, singleItemToPass));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: expectedTransaction,
              },
              {},
              {
                message: 'Available quantity of this product changed meanwhile',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: singleItemToPass,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 0, isDifferent is true, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: true,
              cart: null,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory, singleItemToPass));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
              },
              {},
              {
                message: 'Sorry, this product does not exist anymore',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: singleItemToPass,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 1, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: false,
              cart: null,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory, singleItemToPass));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              transaction: expectedTransaction,
            }),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: singleItemToPass,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 0, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: false,
              cart: null,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory, singleItemToPass));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              transaction: [],
            }),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: singleItemToPass,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is failed', async () => {
          moxios.stubRequest('/transaction', {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory, singleItemToPass));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: singleItemToPass,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });

      describe('single item is NOT passed', () => {
        it('is successful and transaction length is 1, isDifferent is true, cart length is 1', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: true,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: expectedTransaction,
                cart: expectedCart,
              },
              {},
              {
                message: 'Availability of the products changed meanwhile',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: undefined,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 0, isDifferent is true, cart length is 1', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: true,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
                cart: expectedCart,
              },
              {},
              {
                message: 'Sorry, all the products from cart are not available anymore',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: undefined,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 1, isDifferent is false, cart length is 1', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: false,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              transaction: expectedTransaction,
              cart: expectedCart,
            }),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: undefined,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and transaction length is 0, isDifferent is false, cart length is 1', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: false,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory));

          expect(store.getState()).toEqual(
            createExpectedState(initialState, {
              transaction: [],
              cart: expectedCart,
            }),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: undefined,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is failed', async () => {
          moxios.stubRequest('/transaction', {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile();
          await store.dispatch(actions.goToTransaction(defaultHistory));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', '/transaction')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            singleItem: undefined,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });
    });

    describe('inner dispatch', () => {
      describe('single item is passed', () => {
        it('is successful and transaction length is 1, isDifferent is true, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: true,
              cart: null,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Available quantity of this product changed meanwhile',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(4);
          expect(history.push).toHaveBeenCalledWith('/transaction');
          expect(history.goBack).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and transaction length is 0, isDifferent is true, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: true,
              cart: null,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Sorry, this product does not exist anymore',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(4);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).toHaveBeenCalledTimes(1);

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and transaction length is 1, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: false,
              cart: null,
            },
          });

          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.push).toHaveBeenCalledWith('/transaction');
          expect(history.goBack).not.toHaveBeenCalled();
        });

        it('is successful and transaction length is 0, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: false,
              cart: null,
            },
          });

          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).toHaveBeenCalledTimes(1);
        });

        it('is failed', async () => {
          moxios.stubRequest('/transaction', {
            status: 500,
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });
      });

      describe('single item is NOT passed', () => {
        it('is successful and transaction length is 1, isDifferent is true, cart length is 1', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: true,
              cart: expectedCart,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Available quantity of this product changed meanwhile',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.push).toHaveBeenCalledWith('/transaction');
          expect(history.goBack).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and transaction length is 0, isDifferent is true, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: true,
              cart: expectedCart,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Sorry, this product does not exist anymore',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).toHaveBeenCalledTimes(1);

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and transaction length is 1, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              isDifferent: false,
              cart: expectedCart,
            },
          });

          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(4);
          expect(history.push).toHaveBeenCalledWith('/transaction');
          expect(history.goBack).not.toHaveBeenCalled();
        });

        it('is successful and transaction length is 0, isDifferent is false, cart is null', async () => {
          moxios.stubRequest('/transaction', {
            status: 200,
            response: {
              transaction: [],
              isDifferent: false,
              cart: expectedCart,
            },
          });

          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(4);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).toHaveBeenCalledTimes(1);
        });

        it('is failed', async () => {
          moxios.stubRequest('/transaction', {
            status: 500,
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          await actions.goToTransaction(history, singleItemToPass)(innerDispatchFn);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.tradeStart());
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.tradeEnd());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.push).not.toHaveBeenCalled();
          expect(history.goBack).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });
      });
    });
  });

  describe('buyProducts()', () => {
    const createHistory = (replaceFn = jest.fn()) => ({
      replace: replaceFn,
    });
    const defaultHistory = createHistory();

    const defaultTransaction = [
      createTransactionAndOrderProdItem({
        productId: 'p1',
      }),
    ];

    const expectedTransaction = [
      createTransactionAndOrderProdItem({
        productId: 'p2',
      }),
    ];
    const expectedCart = [createCartItem()];

    const replaceFnArgument = '/my-account/placed-orders';

    describe('store', () => {
      describe('receive transaction only', () => {
        it('is successful and received transaction length is 1, lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              cart: undefined,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/cart'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: expectedTransaction,
                cart: undefined,
              },
              {},
              {
                message:
                  'Availability of the products changed meanwhile. Check all the products in transaction and try again',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: true,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and received transaction length is 1, lastPath is other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              cart: undefined,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/product/p1'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: expectedTransaction,
                cart: undefined,
              },
              {},
              {
                message:
                  'Availability of the products changed meanwhile. Check all the products in transaction and try again',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: false,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and received transaction length is 0, lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: [],
              cart: undefined,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/cart'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
                cart: undefined,
              },
              {},
              {
                message: 'Sorry, these products are not available anymore',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: true,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and received transaction length is 0, lastPath is other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: [],
              cart: undefined,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/product/p1'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
                cart: undefined,
              },
              {},
              {
                message: 'Sorry, these products are not available anymore',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: false,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });

      describe('receive cart only', () => {
        it('is successful and lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: undefined,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/cart'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
                cart: expectedCart,
              },
              {},
              {
                message: 'Transaction was successful',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: true,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('is successful and lastPath is other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: undefined,
              cart: expectedCart,
            },
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/product/p1'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {
                transaction: [],
                cart: expectedCart,
              },
              {},
              {
                message: 'Transaction was successful',
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: false,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });

      describe('failed requests', () => {
        it('has lastPath /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/cart'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: true,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('has lastPath other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await store.dispatch(actions.buyProducts(defaultHistory, '/product/p1'));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                message: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'post', '/orders')).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
            transaction: defaultTransaction,
            deliveryAddress: defaultDeliveryAddress,
            clearCart: false,
          });
          expect(moxios.requests.__items).toHaveLength(1);
        });
      });
    });

    describe('inner dispatch', () => {
      describe('receive transaction only', () => {
        it('is successful and received transaction length is 1, lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              cart: undefined,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/cart')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(undefined));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Availability of the products changed meanwhile. Check all the products in transaction and try again',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and received transaction length is 1, lastPath is other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: expectedTransaction,
              cart: undefined,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/product/p1')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(
            2,
            tradeActions.setTransaction(expectedTransaction),
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(undefined));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Availability of the products changed meanwhile. Check all the products in transaction and try again',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and received transaction length is 0, lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: [],
              cart: undefined,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/cart')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(undefined));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Sorry, these products are not available anymore',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and received transaction length is 0, lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: [],
              cart: undefined,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/product/p1')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(undefined));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
            'Sorry, these products are not available anymore',
          );
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });
      });

      describe('receive cart only', () => {
        it('is successful and lastPath is /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: undefined,
              cart: expectedCart,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/cart')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith('Transaction was successful');
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).toHaveBeenCalledWith(replaceFnArgument);

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('is successful and lastPath is other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 200,
            response: {
              transaction: undefined,
              cart: expectedCart,
            },
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/product/p1')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(innerDispatchFn).toHaveBeenNthCalledWith(2, tradeActions.setTransaction([]));
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, tradeActions.setCart(expectedCart));
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith('Transaction was successful');
          expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(5);
          expect(history.replace).toHaveBeenCalledWith(replaceFnArgument);

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });
      });

      describe('failed requests', () => {
        it('has lastPath /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 500,
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/cart')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });

        it('has lastPath other than /cart', async () => {
          moxios.stubRequest('/orders', {
            status: 500,
          });

          const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

          uiActions.setAndDeleteMessage = jest.fn();
          const innerDispatchFn = jest.fn();
          const history = createHistory();
          const { store } = setUpStoreWithDefaultProfile({
            transaction: defaultTransaction,
          });
          await actions.buyProducts(history, '/product/p1')(innerDispatchFn, store.getState);

          expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
          expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
          expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
          expect(innerDispatchFn).toHaveBeenCalledTimes(3);
          expect(history.replace).not.toHaveBeenCalled();

          uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
        });
      });
    });
  });
});
