import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import TransactionAndOrderProdItem from './TransactionAndOrderProdItem';
import theme from '../../styled/theme';
import {
  checkProps,
  createTransactionAndOrderProdItem,
} from '../../shared/testUtility/testUtility';

const setUp = (data, orderId) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/transaction' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <TransactionAndOrderProdItem data={data} orderId={orderId} />
        </ThemeProvider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<TransactionAndOrderProdItem />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(
        checkProps(TransactionAndOrderProdItem, { data: createTransactionAndOrderProdItem() }),
      ).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(TransactionAndOrderProdItem, {})).not.toBe(null);
    });
  });

  describe('checks how renders and behaviour', () => {
    it('should render everything correctly with photo of product directly', () => {
      const data = createTransactionAndOrderProdItem({
        productId: 'p1',
        sellerUsername: 'user1',
        price: 9.9,
        quantity: 2,
        name: 'productName',
        photo: true,
      });
      setUp(data);
      expect(screen.getByTestId('TransactionAndOrderProdItem-product-link-name')).toHaveTextContent(
        'productName',
      );
      expect(
        screen.getByTestId('TransactionAndOrderProdItem-product-price-per-piece'),
      ).toHaveTextContent('2 x $9.90');
      expect(
        screen.getByTestId('TransactionAndOrderProdItem-product-overall-price'),
      ).toHaveTextContent('$19.80');
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute(
        'src',
        `${process.env.REACT_APP_API_URL}/products/p1/photo`,
      );
    });

    it('should render with image from orders collection', () => {
      const data = createTransactionAndOrderProdItem({
        productId: 'p1',
        sellerUsername: 'user1',
        price: 2,
        quantity: 5,
        name: 'productName',
        photo: true,
      });
      setUp(data, 'o1');
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute(
        'src',
        `${process.env.REACT_APP_API_URL}/orders/o1/p1/photo`,
      );
    });

    it('should call push with correct paths after clicking product links', () => {
      const data = createTransactionAndOrderProdItem({
        productId: 'p1',
      });
      const { history } = setUp(data);

      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-photo'));
      expect(history.push).toHaveBeenCalledWith('/product/p1');

      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-name'));
      expect(history.push).toHaveBeenLastCalledWith('/product/p1');

      expect(history.push).toHaveBeenCalledTimes(2);
    });
  });
});
