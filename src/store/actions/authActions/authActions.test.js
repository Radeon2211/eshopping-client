import moxios from 'moxios';
import axios from '../../../axios';
import {
  defaultUserProfile,
  testStore,
  checkReqMethodAndURL,
  createExpectedState,
  defaultDeliveryAddress,
} from '../../../shared/testUtility';
import * as actions from '../indexActions';
import * as uiActions from '../uiActions';
import * as authActions from './authActions';

describe('Async functions', () => {
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
      country: {
        value: 'Poland',
        label: 'Poland',
      },
      phoneNumber: '123456789',
      phonePrefix: {
        value: '48',
        label: '+48 Poland',
      },
      hideEmail: true,
      hidePhone: false,
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

    describe('Store', () => {
      it('Is successful', async () => {
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
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual({
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
        });
      });

      it('Is failed', async () => {
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
              formError: 'Something went wrong',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users')).toEqual(true);
      });
    });

    describe('Inner dispatch', () => {
      it('Is successful', async () => {
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

      it('Is failed', async () => {
        moxios.stubRequest('/users', {
          status: 400,
        });

        const innerDispatchFn = jest.fn();
        await actions.registerUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          uiActions.formFail('Something went wrong'),
        );
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

    describe('Store', () => {
      it('Is successful and isDifferent is false', async () => {
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
      });

      it('Is successful and isDifferent is true', async () => {
        moxios.stubRequest('/users/login', {
          status: 200,
          response: {
            user: expectedUser,
            isDifferent: true,
          },
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.loginUser(credentials));

        expect(checkReqMethodAndURL(moxios, 'post', '/users/login')).toEqual(true);
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
      });

      it('Is is failed', async () => {
        moxios.stubRequest('/users/login', {
          status: 400,
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.loginUser(credentials));

        expect(checkReqMethodAndURL(moxios, 'post', '/users/login')).toEqual(true);
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: 'Something went wrong',
            },
          ),
        );
      });
    });

    describe('Inner dispatch', () => {
      it('Is successful and isDifferent is false', async () => {
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

      it('Is successful and isDifferent is true', async () => {
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

      it('Is failed', async () => {
        moxios.stubRequest('/users/login', {
          status: 400,
        });

        const innerDispatchFn = jest.fn();
        await actions.loginUser(credentials)(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          uiActions.formFail('Something went wrong'),
        );
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('fetchProfile()', () => {
    const expectedUser = {
      ...defaultUserProfile,
      cart: [],
    };

    describe('Store', () => {
      it('Is successful and isDifferent is false', async () => {
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
      });

      it('Is successful and isDifferent is true', async () => {
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
      });

      it('Is failed', async () => {
        moxios.stubRequest('/users/me', {
          status: 500,
        });

        const { store, initialState } = testStore();
        await store.dispatch(actions.fetchProfile());

        expect(store.getState()).toEqual(createExpectedState(initialState, { profile: null }));
        expect(checkReqMethodAndURL(moxios, 'get', '/users/me')).toEqual(true);
      });
    });

    describe('Inner dispatch', () => {
      it('Is successful and isDifferent is false', async () => {
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

      it('Is successful and isDifferent is true', async () => {
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

      it('Is failed', async () => {
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

  describe('logout()', () => {
    describe('Store', () => {
      it('Is successful', async () => {
        moxios.stubRequest('/users/logout', {
          status: 200,
        });

        const { store, initialState } = testStore({
          profile: defaultUserProfile,
          deliveryAddress: defaultDeliveryAddress,
          cart: [],
          transaction: [],
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
            transaction: undefined,
            placedOrders: undefined,
            sellHistory: undefined,
            orderDetails: undefined,
            orderCount: undefined,
          }),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/logout')).toEqual(true);
      });

      it('Is failed', async () => {
        moxios.stubRequest('/users/logout', {
          status: 500,
        });

        const initialAuth = {
          profile: defaultUserProfile,
          deliveryAddress: defaultDeliveryAddress,
          cart: [],
          transaction: [],
          placedOrders: [],
          sellHistory: [],
          orderDetails: null,
          orderCount: 0,
        };
        const { store, initialState } = testStore({
          ...initialAuth,
        });
        await store.dispatch(actions.logoutUser());

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {
              ...initialAuth,
            },
            {},
            {
              message: 'Unable to logout. Something went wrong',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/users/logout')).toEqual(true);
      });
    });

    describe('Inner dispatch', () => {
      it('Is successful', async () => {
        moxios.stubRequest('/users/logout', {
          status: 200,
        });

        const innerDispatchFn = jest.fn();
        await actions.logoutUser()(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenCalledWith(authActions.logout());
        expect(innerDispatchFn).toHaveBeenCalledTimes(1);
      });

      it('Is failed', async () => {
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
});
