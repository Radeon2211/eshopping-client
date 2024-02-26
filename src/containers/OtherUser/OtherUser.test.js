import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OtherUser from './OtherUser';
import {
  productPages,
  defaultProductsPerPage,
  defaultScrollToConfig,
} from '../../shared/constants';
import { createProductItem, renderAppPart } from '../../shared/testUtility/testUtility';
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

const setUp = (otherUser, currentUserUsername = 'user2') => {
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
    ...renderAppPart(<OtherUser />, {
      pathname: `/user/${otherUser?.username}`,
      search: '?p=1',
      store,
    }),
    store,
  };
};

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
  useParams: () => ({
    username: defaultOtherUser.username,
  }),
}));

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOtherUser: (username) => username,
  fetchProducts: (queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  }),
  setOtherUser: (user) => user,
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<OtherUser />', () => {
  describe('check how renders', () => {
    describe('general elements and meta tags', () => {
      it('should render <Loader /> if other user is undefined', async () => {
        setUp(undefined);
        expect(screen.getByTestId('Loader')).toBeInTheDocument();
        await waitFor(() => {
          expect(document.title).toEqual('User info is loading... - E-Shopping');
        });
      });

      it('should render info about problem with fetching if other user is null', async () => {
        setUp(null);
        expect(screen.getByTestId('OtherUser-error')).toBeInTheDocument();
        await waitFor(() => {
          expect(document.title).toEqual('User not found - E-Shopping');
        });
      });

      it('should have regular document title', async () => {
        const otherUser = { ...defaultOtherUser, email: 'test@email.com', phone: '123' };
        setUp(otherUser);
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
    it('should only replace path if otherUser is the same as current user', () => {
      const { store } = setUp(defaultOtherUser, 'user1');

      expect(mockedUseNavigateFn).toHaveBeenCalledTimes(1);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/my-account/data', { replace: true });
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should call fetchOtherUser(), fetchProducts(), and scrollTo() if otherUser is different from current user', () => {
      const { store } = setUp(defaultOtherUser, 'differentUser');

      expect(mockedUseNavigateFn).not.toHaveBeenCalled();

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
