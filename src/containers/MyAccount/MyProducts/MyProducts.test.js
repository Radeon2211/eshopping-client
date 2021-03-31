import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import theme from '../../../styled/theme';
import MyProducts from './MyProducts';
import { createProductItem, defaultUserProfile } from '../../../shared/testUtility/testUtility';
import { pages, productConditions, defaultProductsPerPage } from '../../../shared/constants';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultSearch = '?p=1';

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/my-account/products', search: defaultSearch },
  replace: jest.fn(),
};

const defaultProps = {
  userProfile: defaultUserProfile,
  location: {
    search: defaultSearch,
  },
};

const defaultProducts = [
  createProductItem({
    id: 'p1',
    name: 'Wellingtons',
    price: 10,
    quantity: 5,
    buyerQuantity: 2,
    quantitySold: 3,
    condition: productConditions.NEW,
    photo: true,
    sellerUsername: 'sellerUser',
  }),
];

const setUp = () => {
  const store = mockStore({
    product: {
      products: defaultProducts,
      productCount: 1,
      minPrice: 10,
      maxPrice: 10,
    },
    ui: {
      productsPerPage: defaultProductsPerPage,
      isDataLoading: false,
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={defaultHistory}>
          <ThemeProvider theme={theme}>
            <MyProducts {...defaultProps} />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  fetchProducts: jest.fn().mockImplementation((queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  })),
}));

afterEach(cleanup);

describe('<MySellHistory />', () => {
  it('should render everything correctly with given default data', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call fetchProducts() in useEffect()', () => {
    const { store } = setUp();
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.fetchProducts(defaultSearch, pages.MY_PRODUCTS),
    );
  });
});
