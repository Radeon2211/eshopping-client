import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../styled/theme';
import ProductList from './ProductList';
import { checkProps, createProductItem } from '../../shared/testUtility/testUtility';
import { productPages } from '../../shared/constants';

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
    quantity: 6,
    name: 'product2',
  }),
];

const createProps = (isDataLoading, products, page = productPages.ALL_PRODUCTS) => ({
  isDataLoading,
  products,
  page,
});

const setUp = (props, search = '?p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
  };

  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ProductList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<ProductList />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const expectedProps = createProps(false);
      expect(checkProps(ProductList, expectedProps)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(ProductList, {})).not.toBeNull();
    });
  });

  describe('check how renders', () => {
    it('should render only <LoadingOverlay />', () => {
      const props = createProps(true);
      setUp(props);
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
      expect(screen.queryByTestId('ProductItem')).not.toBeInTheDocument();
    });

    it('should render list with two items', () => {
      const props = createProps(false, defaultProducts);
      setUp(props);
      expect(screen.getAllByTestId('ProductItem')).toHaveLength(2);
    });

    it('should render list with one item', () => {
      const props = createProps(false, [defaultProducts[0]]);
      setUp(props);
      expect(screen.getAllByTestId('ProductItem')).toHaveLength(1);
    });

    it('should render correct info for ALL_PRODUCTS with filters', () => {
      const props = createProps(false, [], productPages.ALL_PRODUCTS);
      setUp(props, '?p=1&minPrice=100');
      expect(
        screen.getByText(
          "We didn't find any matching results. Try to search something else or change filters",
        ),
      ).toBeInTheDocument();
    });

    it('should render correct info for MY_PRODUCTS with filters', () => {
      const props = createProps(false, [], productPages.MY_PRODUCTS);
      setUp(props, '?p=1&condition=new');
      expect(
        screen.getByText("We didn't find any matching results. Try to change filters"),
      ).toBeInTheDocument();
    });

    it('should render correct info for USER_PRODUCTS with filters', () => {
      const props = createProps(false, [], productPages.USER_PRODUCTS);
      setUp(props, '?p=1&maxPrice=100');
      expect(
        screen.getByText("We didn't find any matching results. Try to change filters"),
      ).toBeInTheDocument();
    });

    it('should render correct info for ALL_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], productPages.ALL_PRODUCTS);
      setUp(props, '?p=1&name=testName');
      expect(
        screen.getByText("We didn't find any matching results. Try to search something else"),
      ).toBeInTheDocument();
    });

    it('should render correct info for MY_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], productPages.MY_PRODUCTS);
      setUp(props, '?p=1&name=testName');
      expect(screen.getByText("You don't have any offers published yet")).toBeInTheDocument();
    });

    it('should render correct info for USER_PRODUCTS without filters other than name', () => {
      const props = createProps(false, [], productPages.USER_PRODUCTS);
      setUp(props, '?p=1&name=testName');
      expect(
        screen.getByText("This user doesn't have any offers published yet"),
      ).toBeInTheDocument();
    });
  });
});
