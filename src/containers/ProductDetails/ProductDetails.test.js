import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductDetails from './ProductDetails';
import { defaultUserProfile } from '../../shared/testUtility/testUtility';
import noPhoto from '../../images/no-photo.png';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const defaultProductId = '123';

const defaultProductDetails = {
  _id: defaultProductId,
  seller: { username: 'user1' },
  condition: 'not_applicable',
  photo: true,
  price: 2.5,
  description: '',
  quantity: 5,
  name: 'testName',
  quantitySold: 0,
  buyerQuantity: 0,
};

const defaultCart = [{ _id: '123', product: 'productId', quantity: 1 }];

const defaultStore = {
  ui: { isDataLoading: false },
  auth: { profile: { ...defaultUserProfile, username: 'user1' }, cart: defaultCart },
  product: {
    productDetails: defaultProductDetails,
  },
};

const setUp = (store, pushFn = jest.fn()) => {
  const finalStore = store
    ? mockStore({
        ...defaultStore,
        ...store,
      })
    : mockStore(defaultStore);

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: `/product/${defaultProductId}` },
    push: pushFn,
  };

  return render(
    <Provider store={finalStore}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <ProductDetails />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: defaultProductId,
  }),
}));

afterEach(cleanup);

describe('<ProductDetails />', () => {
  describe('Check how renders', () => {
    describe('Snapshots', () => {
      it('Should render only <Loader /> if productDetails is undefined', () => {
        const store = { product: { productDetails: undefined } };
        const { asFragment } = setUp(store);
        expect(asFragment()).toMatchSnapshot();
      });

      it('Should render only info that there is a problem to fetch product details', () => {
        const store = { product: { productDetails: null } };
        const { asFragment } = setUp(store);
        expect(asFragment()).toMatchSnapshot();
      });

      it(`Should render everything correctly if user is a product's owner`, () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              description: 'testDescription',
              quantitySold: 1,
              buyerQuantity: 1,
            },
          },
        };
        const { asFragment } = setUp(store);
        expect(asFragment()).toMatchSnapshot();
      });
    });

    describe('Check single items', () => {
      it('Should render quantity sold node - "2 people bought 3 units"', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              quantitySold: 3,
              buyerQuantity: 2,
            },
          },
        };
        setUp(store);
        expect(screen.getByTestId('ProductDetails-quantity-sold')).toHaveTextContent(
          '2 people bought 3 units',
        );
      });

      it('Should render quantity sold node - "1 person bought 4 units"', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              quantitySold: 4,
              buyerQuantity: 1,
            },
          },
        };
        setUp(store);
        expect(screen.getByTestId('ProductDetails-quantity-sold')).toHaveTextContent(
          '1 person bought 4 units',
        );
      });

      it('Should render no description if it is empty and NOT render quantity sold node if quantitySold is 0', () => {
        setUp();
        expect(screen.getByTestId('ProductDetails-no-description')).toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-full-description')).not.toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-quantity-sold')).not.toBeInTheDocument();
      });

      it('Should render default photo', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              photo: false,
            },
          },
        };
        setUp(store);
        expect(screen.getByAltText(defaultProductDetails.name)).toHaveAttribute('src', noPhoto);
      });

      it(`Should NOT render edit and delete buttons if user is not admin and not a product's owner`, () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              seller: { username: 'user2' },
            },
          },
        };
        setUp(store);
        expect(screen.queryByTestId('ProductDetails-edit-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-delete-button')).not.toBeInTheDocument();
      });

      it(`Should NOT render edit button and should render delete button if user not a product's owner but is an admin`, () => {
        const store = {
          auth: {
            profile: { ...defaultUserProfile, username: 'user2', isAdmin: true },
            cart: defaultCart,
          },
        };
        setUp(store);
        expect(screen.queryByTestId('ProductDetails-edit-button')).not.toBeInTheDocument();
        expect(screen.getByTestId('ProductDetails-delete-button')).toBeInTheDocument();
      });

      it('Should call push with correct path after clicking on seller link', () => {
        const pushFn = jest.fn();
        setUp(defaultStore, pushFn);

        fireEvent.click(screen.getByTestId('ProductDetails-seller-link'));
        expect(pushFn).toHaveBeenCalledWith(`/user/${defaultProductDetails.seller.username}?p=1`);
        expect(pushFn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
