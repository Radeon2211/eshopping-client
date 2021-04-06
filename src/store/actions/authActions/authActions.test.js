import moxios from 'moxios';
import axios from '../../../axios';
import { defaultAppPath, defaultErrorMessage } from '../../../shared/constants';
import {
  defaultUserProfile,
  testStore,
  checkReqMethodAndURL,
  createExpectedState,
  defaultDeliveryAddress,
  setUpStoreWithDefaultProfile,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from '../uiActions/uiActions';
import * as authActions from './authActions';
import * as actionTypes from '../actionTypes';

describe('action creators', () => {
  it('tests setProfile()', () => {
    const profile = {
      ...defaultUserProfile,
      cart: [],
    };
    const expectedAction = {
      type: actionTypes.SET_PROFILE,
      profile,
    };
    expect(authActions.setProfile(profile)).toEqual(expectedAction);
  });

  it('tests logout()', () => {
    const expectedAction = {
      type: actionTypes.LOGOUT_USER,
    };
    expect(authActions.logout()).toEqual(expectedAction);
  });

  it('tests setDeliveryAddress()', () => {
    const deliveryAddress = defaultDeliveryAddress;
    const expectedAction = {
      type: actionTypes.SET_DELIVERY_ADDRESS,
      deliveryAddress,
    };
    expect(authActions.setDeliveryAddress(deliveryAddress)).toEqual(expectedAction);
  });

  it('tests setOtherUser()', () => {
    const otherUser = {
      username: 'otheruser',
      email: 'otheruser@domain.com',
      phone: '+48 123987456',
    };
    const expectedAction = {
      type: actionTypes.SET_OTHER_USER,
      otherUser,
    };
    expect(authActions.setOtherUser(otherUser)).toEqual(expectedAction);
  });
});

describe('async functions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe('registerUser()', () => {
    const credentials = {
      email: 'user1@domain.com',
      username: 'user1',
      password: 'Pa$$w0rd',
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 11',
      zipCode: '12-345',
      city: 'Grunwald',
      country: 'Poland',
      phone: '+48 123456789',
      contacts: {
        email: false,
        phone: true,
      },
    };

    const expectedDeliveryAddress = {
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 11',
      zipCode: '12-345',
      city: 'Grunwald',
      country: 'Poland',
      phone: '+48 123456789',
    };

    const expectedUser = {
      _id: '123',
      email: 'user1@domain.com',
      username: 'user1',
      ...expectedDeliveryAddress,
      contacts: {
        email: true,
        phone: false,
      },
      status: 'pending',
      createdAt: '2021-03-14T11:16:13.547Z',
      cart: [],
    };

    const expectedDataToPass = {
      email: 'user1@domain.com',
      username: 'user1',
      password: 'Pa$$w0rd',
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 11',
      zipCode: '12-345',
      city: 'Grunwald',
      country: 'Poland',
      phone: '+48 123456789',
      contacts: { email: false, phone: true },
    };

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.registerUser(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: {
                ...expectedUser,
                cart: undefined,
              },
              deliveryAddress: expectedDeliveryAddress,
              cart: [],
            },
            {},
            {
              message:
                'Account has been created successfully! Check out your inbox to verify account',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(expectedDataToPass);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users', {
          status: 400,
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.registerUser(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(expectedDataToPass);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.registerUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.setProfile(expectedUser));
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Account has been created successfully! Check out your inbox to verify account',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users', {
          status: 400,
        });

        const innerDispatchFn = jest.fn();
        await actions.registerUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('loginUser()', () => {
    const credentials = {
      email: 'user1@domain.com',
      password: 'Pa$$w0rd',
    };

    const expectedUser = {
      ...defaultUserProfile,
      cart: [],
    };

    describe('store', () => {
      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/users/login', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: false,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.loginUser(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            profile: {
              ...expectedUser,
              cart: undefined,
            },
            deliveryAddress: defaultDeliveryAddress,
            cart: expectedUser.cart,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/login')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/users/login', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: true,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.loginUser(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: {
                ...expectedUser,
                cart: undefined,
              },
              deliveryAddress: defaultDeliveryAddress,
              cart: expectedUser.cart,
            },
            {},
            {
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/login')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/login', {
          status: 400,
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.loginUser(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/login')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/users/login', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.loginUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.setProfile(expectedUser));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/users/login', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: true,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.loginUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.setProfile(expectedUser));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/login', {
          status: 400,
        });

        const innerDispatchFn = jest.fn();
        await actions.loginUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('fetchProfile()', () => {
    const expectedUser = {
      ...defaultUserProfile,
      cart: [],
    };

    describe('store', () => {
      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: false,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.fetchProfile());

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            profile: {
              ...expectedUser,
              cart: undefined,
            },
            deliveryAddress: defaultDeliveryAddress,
            cart: expectedUser.cart,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/users/me')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: true,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.fetchProfile());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: {
                ...expectedUser,
                cart: undefined,
              },
              deliveryAddress: defaultDeliveryAddress,
              cart: expectedUser.cart,
            },
            {},
            {
              message:
                'Some product in cart does not exist any more or its quantity has been changed',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', '/users/me')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.fetchProfile());

        expect(store.getState()).toEqual(createExpectedState(initialState, { profile: null }));
        expect(checkReqMethodAndURL(moxios, 'get', '/users/me')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and isDifferent is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: false,
          },
        });

        const originalWriteChangeCartInfo = uiActions.writeChangeCartInfo;

        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchProfile()(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, authActions.setProfile(expectedUser));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(false);
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);

        uiActions.writeChangeCartInfo = originalWriteChangeCartInfo;
      });

      it('is successful and isDifferent is true', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: true,
          },
        });
        uiActions.writeChangeCartInfo = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchProfile()(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, authActions.setProfile(expectedUser));
        expect(uiActions.writeChangeCartInfo).toHaveBeenCalledWith(true);
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });
        const innerDispatchFn = jest.fn();
        await actions.fetchProfile()(innerDispatchFn);
        expect(innerDispatchFn).toHaveBeenCalledWith(authActions.setProfile(null));
        expect(innerDispatchFn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('logoutUser()', () => {
    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/logout', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile({
          placedOrders: [],
          sellHistory: [],
          orderDetails: null,
          orderCount: 0,
        });
        await store.dispatch(actions.logoutUser());

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            profile: null,
            deliveryAddress: undefined,
            cart: undefined,
            placedOrders: undefined,
            sellHistory: undefined,
            orderDetails: undefined,
            orderCount: undefined,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/logout')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/logout', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.logoutUser());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'Unable to logout. Something went wrong',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/logout')).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/logout', {
          status: 200,
        });

        const innerDispatchFn = jest.fn();
        await actions.logoutUser()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenCalledWith(authActions.logout());
        expect(innerDispatchFn).toHaveBeenCalledTimes(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/logout', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.logoutUser()(innerDispatchFn);

        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Unable to logout. Something went wrong',
        );
        expect(innerDispatchFn).toHaveBeenCalledTimes(1);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('updateUser()', () => {
    const defaultUser = {
      ...defaultUserProfile,
      cart: [],
    };

    const credentials = {
      firstName: 'updatedFirstName',
      lastName: 'updatedLastName',
    };

    const message = 'Name has been changed successfully';

    const expectedUser = {
      ...defaultUser,
      ...credentials,
      cart: [],
    };

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.updateUser(credentials, message));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: {
                ...expectedUser,
                cart: undefined,
              },
              deliveryAddress: {
                ...defaultDeliveryAddress,
                ...credentials,
              },
              cart: expectedUser.cart,
            },
            {},
            {
              message,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.updateUser(credentials, message));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.updateUser(credentials, message)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.setProfile(expectedUser));
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(message);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.updateUser(credentials, message)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('changeEmail()', () => {
    const credentials = {
      email: 'updatedFirstName',
      currentPassword: 'Pa$$w0rd',
    };

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me/email', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.changeEmail(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message:
                'You need to verify new email address. We sent you an email with verification link',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me/email')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me/email', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.changeEmail(credentials));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me/email')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me/email', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.changeEmail(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'You need to verify new email address. We sent you an email with verification link',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me/email', {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.changeEmail(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('deleteAccount()', () => {
    const credentials = {
      currentPassword: 'Pa$$w0rd',
    };

    const createHistory = (replaceFn = jest.fn()) => ({
      replace: replaceFn,
    });

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile({
          placedOrders: [],
          sellHistory: [],
          orderCount: 0,
        });
        await store.dispatch(actions.deleteAccount(credentials, createHistory()));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: null,
              deliveryAddress: undefined,
              cart: undefined,
              transaction: undefined,
              placedOrders: undefined,
              sellHistory: undefined,
              orderDetails: undefined,
              orderCount: undefined,
            },
            {},
            {
              message: `Your account has been deleted. Goodbye ${defaultUserProfile.username}!`,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'delete', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.deleteAccount(credentials, createHistory()));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'delete', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        const replaceFn = jest.fn();
        const { store } = setUpStoreWithDefaultProfile();
        await actions.deleteAccount(credentials, createHistory(replaceFn))(
          innerDispatchFn,
          store.getState,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.logout());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          `Your account has been deleted. Goodbye ${defaultUserProfile.username}!`,
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);
        expect(replaceFn).toHaveBeenCalledWith(defaultAppPath);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.deleteAccount(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('changeDeliveryAddress()', () => {
    const credentials = {
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 11',
      zipCode: '12-345',
      city: 'Grunwald',
      country: 'Poland',
      phone: '+48 123456789',
    };

    const expectedUser = {
      ...defaultUserProfile,
      ...credentials,
      cart: [],
    };

    describe('store', () => {
      it('is successful and onlyCurrentOrders is true', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          actions.changeDeliveryAddress({
            ...credentials,
            onlyCurrentOrders: true,
          }),
        );

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            deliveryAddress: credentials,
          }),
        );
        expect(moxios.requests.mostRecent()).toBeUndefined();
      });

      it('is successful and onlyCurrentOrders is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          actions.changeDeliveryAddress({
            ...credentials,
            onlyCurrentOrders: false,
          }),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              profile: {
                ...expectedUser,
                cart: undefined,
              },
              deliveryAddress: credentials,
            },
            {},
            {
              message: 'Delivery address has been saved in your profile',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed if onlyCurrentOrders is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          actions.changeDeliveryAddress({
            ...credentials,
            onlyCurrentOrders: false,
          }),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/me')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(credentials);
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and onlyCurrentOrders is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.changeDeliveryAddress({
          ...credentials,
          onlyCurrentOrders: false,
        })(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, authActions.setProfile(expectedUser));
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Delivery address has been saved in your profile',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is successful and onlyCurrentOrders is true', async () => {
        moxios.stubRequest('/users/me', {
          status: 200,
          response: {
            user: expectedUser,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.changeDeliveryAddress({
          ...credentials,
          onlyCurrentOrders: true,
        })(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          authActions.setDeliveryAddress(credentials),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed if onlyCurrentOrders is false', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.changeDeliveryAddress({
          ...credentials,
          onlyCurrentOrders: false,
        })(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('fetchOtherUser()', () => {
    const otherUserUsername = 'otheruser';
    const expectedProfile = {
      username: otherUserUsername,
    };

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest(`/users/${otherUserUsername}`, {
          status: 200,
          response: {
            profile: expectedProfile,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.fetchOtherUser(otherUserUsername));

        expect(store.getState()).toEqual(
          createExpectedState(initialState, {
            otherUser: expectedProfile,
          }),
        );

        expect(checkReqMethodAndURL(moxios, 'get', `/users/${otherUserUsername}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest(`/users/${otherUserUsername}`, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.fetchOtherUser(otherUserUsername));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              otherUser: null,
            },
            {},
            {
              message: defaultErrorMessage,
            },
          ),
        );

        expect(checkReqMethodAndURL(moxios, 'get', `/users/${otherUserUsername}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest(`/users/${otherUserUsername}`, {
          status: 200,
          response: {
            profile: expectedProfile,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.fetchOtherUser(otherUserUsername)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          authActions.setOtherUser(expectedProfile),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed', async () => {
        moxios.stubRequest(`/users/${otherUserUsername}`, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchOtherUser(otherUserUsername)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, authActions.setOtherUser(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('addAdmin()', () => {
    const userEmail = 'user@domain.com';

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/add-admin', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.addAdmin(userEmail));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: `"${userEmail}" has been made an admin successfully`,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/add-admin')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/add-admin', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.addAdmin(userEmail));

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
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/add-admin')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/add-admin', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addAdmin(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          `"${userEmail}" has been made an admin successfully`,
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/add-admin', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addAdmin(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formFail());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('removeAdmin()', () => {
    const userEmail = 'user@domain.com';

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/remove-admin', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.removeAdmin(userEmail));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: `Admin privileges have been revoked from "${userEmail}" successfully`,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/remove-admin')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/remove-admin', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.removeAdmin(userEmail));

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
        expect(checkReqMethodAndURL(moxios, 'patch', '/users/remove-admin')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/remove-admin', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.removeAdmin(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          `Admin privileges have been revoked from "${userEmail}" successfully`,
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/remove-admin', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.removeAdmin(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formFail());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('sendAccountVerificationLink()', () => {
    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/send-account-verification-email', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.sendAccountVerificationLink());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'Email has been sent successfully! Check out your inbox',
            },
          ),
        );
        expect(
          checkReqMethodAndURL(moxios, 'post', '/users/send-account-verification-email'),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/send-account-verification-email', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.sendAccountVerificationLink());

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
          checkReqMethodAndURL(moxios, 'post', '/users/send-account-verification-email'),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/send-account-verification-email', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.sendAccountVerificationLink()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Email has been sent successfully! Check out your inbox',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/send-account-verification-email', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.sendAccountVerificationLink()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formFail());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('resetPassword()', () => {
    const userEmail = 'user@domain.com';

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/request-for-reset-password', {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.resetPassword(userEmail));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'Verification email has been sent to you! Check out your inbox',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/request-for-reset-password')).toEqual(
          true,
        );
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/request-for-reset-password', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(actions.resetPassword(userEmail));

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
        expect(checkReqMethodAndURL(moxios, 'post', '/users/request-for-reset-password')).toEqual(
          true,
        );
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({ email: userEmail });
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest('/users/request-for-reset-password', {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.resetPassword(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Verification email has been sent to you! Check out your inbox',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest('/users/request-for-reset-password', {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.resetPassword(userEmail)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formFail());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });
});
