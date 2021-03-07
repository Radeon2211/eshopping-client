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
import { PRODUCTS_PER_PAGE } from '../../shared/constants';
import { createProductListItem } from '../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultOtherUser = { _id: 'u1', username: 'user1' };

const defaultProducts = [
  createProductListItem('p1', 'user1', 4, 10.6, 'product1'),
  createProductListItem('p2', 'user1', 6, 299.98, 'product2'),
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

  return render(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <OtherUser {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
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

  describe('Check how history behaves', () => {
    it('Should call replace if otherUser is the same as current user', () => {
      const replaceFn = jest.fn();
      setUp(defaultOtherUser, 'user1', replaceFn);
      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/my-account/data');
    });

    it('Should NOT call replace if otherUser is not the same as current user', () => {
      const replaceFn = jest.fn();
      setUp(defaultOtherUser, 'differentUser', replaceFn);
      expect(replaceFn).toHaveBeenCalledTimes(0);
    });
  });
});
