import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import OtherUser from './OtherUser';
import theme from '../../styled/theme';
import { pages, PRODUCTS_PER_PAGE } from '../../shared/constants';
import { createProductItem } from '../../shared/testUtility';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultOtherUser = { _id: 'u1', username: 'user1' };

const defaultProducts = [
  createProductItem('p1', 'user1', 4, 10.6, 'product1'),
  createProductItem('p2', 'user1', 6, 299.98, 'product2'),
];

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOtherUser: jest.fn().mockImplementation((username) => username),
  fetchProducts: jest.fn().mockImplementation((queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  })),
  setOtherUser: jest.fn().mockImplementation((user) => user),
}));

const setUp = (otherUser, currentUserUsername = 'user2', replaceFn = jest.fn()) => {
  const props = {
    match: {
      params: { username: otherUser?.username },
    },
    location: { pathname: `/user/${otherUser?.username}`, search: '?p=1' },
    history: { replace: replaceFn },
  };

  const store = mockStore({
    ui: { isDataLoading: false, productsPerPage: PRODUCTS_PER_PAGE },
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

afterEach(cleanup);

describe('<OtherUser />', () => {
  describe('Check how renders', () => {
    describe('Snapshots', () => {
      it('Should render <Loader /> if other user is undefined', () => {
        const { asFragment } = setUp(undefined);
        expect(asFragment()).toMatchSnapshot();
      });

      it('Should render info about problem with fetching if other user is null', () => {
        const { asFragment } = setUp(null);
        expect(asFragment()).toMatchSnapshot();
      });

      it('Should render everything correctly', () => {
        const otherUser = { ...defaultOtherUser, email: 'test@email.com', phone: '123' };
        const { asFragment } = setUp(otherUser);
        expect(asFragment()).toMatchSnapshot();
      });
    });

    describe('Check single things', () => {
      it('Should render only phone number if other user has only phone number set to public', () => {
        const otherUser = { ...defaultOtherUser, phone: '123' };
        setUp(otherUser);
        expect(screen.getByTestId('OtherUser-phone-wrapper')).toHaveTextContent(
          'Phone number: 123',
        );
        expect(screen.queryByTestId('OtherUser-email-wrapper')).not.toBeInTheDocument();
      });

      it('Should render only phone number if other user has only phone number set to public', () => {
        const otherUser = { ...defaultOtherUser, email: 'email@domain.com' };
        setUp(otherUser);
        expect(screen.getByTestId('OtherUser-email-wrapper')).toHaveTextContent(
          'Email: email@domain.com',
        );
        expect(screen.queryByTestId('OtherUser-phone-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  describe('Check useEffect()', () => {
    it('Should call only replace if otherUser is the same as current user', () => {
      const replaceFn = jest.fn();
      const { store } = setUp(defaultOtherUser, 'user1', replaceFn);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/my-account/data');
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('Should call fetchOtherUser() and fetchProducts() if otherUser is different from current user', () => {
      const replaceFn = jest.fn();
      const { store } = setUp(defaultOtherUser, 'differentUser', replaceFn);

      expect(replaceFn).toHaveBeenCalledTimes(0);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.fetchOtherUser('user1'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.fetchProducts('?p=1', pages.USER_PRODUCTS, 'user1'),
      );
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('Should call setOtherUser() after unmounting component', () => {
      const { store, unmount } = setUp(defaultOtherUser, 'user1');

      expect(store.dispatch).not.toHaveBeenCalled();
      unmount();
      expect(store.dispatch).toHaveBeenCalledWith(actions.setOtherUser(undefined));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
