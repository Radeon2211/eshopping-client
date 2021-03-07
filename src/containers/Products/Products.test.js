import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Products from './Products';
import theme from '../../styled/theme';
import { defaultUserProfile, createProductListItem } from '../../shared/testUtility';
import { PRODUCTS_PER_PAGE } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultProducts = [
  createProductListItem('p1', 'user1', 4, 10.6, 'product1'),
  createProductListItem('p2', 'user1', 6, 299.98, 'product2'),
];

const setUp = (search = '?p=1') => {
  const props = {
    location: { pathname: '/products', search },
  };

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
  };

  const store = mockStore({
    auth: {
      profile: defaultUserProfile,
    },
    product: {
      products: defaultProducts,
    },
    ui: {
      productsPerPage: PRODUCTS_PER_PAGE,
      isDataLoading: false,
    },
  });

  return render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Products {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<Products />', () => {
  describe('Check how renders', () => {
    it('Should render everything correctly with default params and two products', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render heading with `Results for "mushrooms"`', () => {
      setUp('?p=1&name=mushrooms');
      expect(screen.getByTestId('Products-heading')).toHaveTextContent('Results for "mushrooms"');
    });

    it('Should render heading with `Results for "wellingtons"` if wellingtons is in last occurrence of name param', () => {
      setUp('?p=1&name=mushrooms&name=wellingtons');
      expect(screen.getByTestId('Products-heading')).toHaveTextContent('Results for "wellingtons"');
    });
  });
});
