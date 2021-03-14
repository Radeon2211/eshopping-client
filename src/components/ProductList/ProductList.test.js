import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../styled/theme';
import ProductList from './ProductList';
import { checkProps, createProductItem } from '../../shared/testUtility';
import { pages } from '../../shared/constants';

const createHistory = (search = '?p=1') => ({
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/products', search },
});

const defaultHistory = createHistory();

const defaultProducts = [
  createProductItem('p1', 'user1', 4, 10.6, 'product1'),
  createProductItem('p2', 'user1', 6, 299.98, 'product2'),
];

const createProps = (isDataLoading, products, page = pages.ALL_PRODUCTS) => ({
  isDataLoading,
  products,
  page,
});

const setUp = (props, history = defaultHistory) => {
  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ProductList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<ProductItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = createProps(false);
      expect(checkProps(ProductList, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(ProductList, {})).not.toBeNull();
    });
  });

  describe('Check how renders', () => {
    it('Should render only <LoadingOverlay />', () => {
      const props = createProps(true);
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render list with two items', () => {
      const props = createProps(false, defaultProducts);
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render list with one item', () => {
      const props = createProps(false, [defaultProducts[0]]);
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for ALL_PRODUCTS with filters', () => {
      const props = createProps(false, [], pages.ALL_PRODUCTS);
      const history = createHistory('?p=1&minPrice=100');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for MY_PRODUCTS with filters', () => {
      const props = createProps(false, [], pages.MY_PRODUCTS);
      const history = createHistory('?p=1&condition=new');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for USER_PRODUCTS with filters', () => {
      const props = createProps(false, [], pages.USER_PRODUCTS);
      const history = createHistory('?p=1&maxPrice=100');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for ALL_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], pages.ALL_PRODUCTS);
      const history = createHistory('?p=1&name=testName');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for MY_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], pages.MY_PRODUCTS);
      const history = createHistory('?p=1&name=testName');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correct info for USER_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], pages.USER_PRODUCTS);
      const history = createHistory('?p=1&name=testName');
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
