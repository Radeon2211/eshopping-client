import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import OtherUser from './OtherUser';
import theme from '../../styled/theme';
import {
  productPages,
  defaultProductsPerPage,
  defaultScrollToConfig,
} from '../../shared/constants';
import { createProductItem } from '../../shared/testUtility/testUtility';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultOtherUser = { _id: 'u1', username: 'user1' };

const defaultProducts = [
  createProductItem({
    id: 'p1',
    sellerUsername: 'user1',
    price: 10.6,
    quantity: 4,
    name: 'product1',
  }),
  createProductItem({
    id: 'p2',
    sellerUsername: 'user1',
    price: 299.98,
    quantity: 4,
    name: 'product2',
  }),
];

const setUp = (otherUser, currentUserUsername = 'user2', replaceFn = jest.fn()) => {
  const props = {
    match: {
      params: { username: otherUser?.username },
    },
    location: { pathname: `/user/${otherUser?.username}`, search: '?p=1' },
    history: { replace: replaceFn },
  };

  const store = mockStore({
    ui: { isDataLoading: false, productsPerPage: defaultProductsPerPage },
    auth: {
      otherUser,
      profile: {
        username: currentUserUsername,
      },
    },
    product: {
      products: defaultProducts,
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <OtherUser {...props} />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOtherUser: (username) => username,
  fetchProducts: (queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  }),
  setOtherUser: (user) => user,
}));

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<OtherUser />', () => {
  describe('check how renders', () => {
    describe('snapshots', () => {
      it('should render <Loader /> if other user is undefined', async () => {
        const { asFragment } = setUp(undefined);
        expect(asFragment()).toMatchSnapshot();
        await waitFor(() => {
          expect(document.title).toEqual('User info is loading... - E-Shopping');
        });
      });

      it('should render info about problem with fetching if other user is null', async () => {
        const { asFragment } = setUp(null);
        expect(asFragment()).toMatchSnapshot();
        await waitFor(() => {
          expect(document.title).toEqual('User not found - E-Shopping');
        });
      });

      it('should render everything correctly', async () => {
        const otherUser = { ...defaultOtherUser, email: 'test@email.com', phone: '123' };
        const { asFragment } = setUp(otherUser);
        expect(asFragment()).toMatchSnapshot();
        await waitFor(() => {
          expect(document.title).toEqual('User "user1" - E-Shopping');
        });
      });
    });

    describe('check single things', () => {
      it('should render only phone number if other user has only phone number set to public', () => {
        const otherUser = { ...defaultOtherUser, phone: '123' };
        setUp(otherUser);
        expect(screen.getByTestId('OtherUser-phone-wrapper')).toHaveTextContent(
          'Phone number: 123',
        );
        expect(screen.queryByTestId('OtherUser-email-wrapper')).not.toBeInTheDocument();
      });

      it('should render only phone number if other user has only phone number set to public', () => {
        const otherUser = { ...defaultOtherUser, email: 'email@domain.com' };
        setUp(otherUser);
        expect(screen.getByTestId('OtherUser-email-wrapper')).toHaveTextContent(
          'Email: email@domain.com',
        );
        expect(screen.queryByTestId('OtherUser-phone-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  describe('check useEffect()', () => {
    it('should call only replace if otherUser is the same as current user', () => {
      const replaceFn = jest.fn();
      const { store } = setUp(defaultOtherUser, 'user1', replaceFn);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/my-account/data');
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should call fetchOtherUser(), fetchProducts(), and scrollTo() if otherUser is different from current user', () => {
      const replaceFn = jest.fn();
      const { store } = setUp(defaultOtherUser, 'differentUser', replaceFn);

      expect(replaceFn).not.toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.fetchOtherUser('user1'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.fetchProducts('?p=1', productPages.USER_PRODUCTS, 'user1'),
      );
      expect(store.dispatch).toHaveBeenCalledTimes(2);

      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should call setOtherUser() after unmounting component', () => {
      const { store, unmount } = setUp(defaultOtherUser, 'user1');
      expect(store.dispatch).not.toHaveBeenCalled();
      unmount();
      expect(store.dispatch).toHaveBeenCalledWith(actions.setOtherUser(undefined));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
