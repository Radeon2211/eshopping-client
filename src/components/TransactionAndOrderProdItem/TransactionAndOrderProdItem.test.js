import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import TransactionAndOrderProdItem from './TransactionAndOrderProdItem';
import theme from '../../styled/theme';
import { checkProps, createTransactionAndOrderProdItem } from '../../shared/testUtility';

const setUp = (data, orderId = '', pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/transaction' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <TransactionAndOrderProdItem data={data} orderId={orderId} />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<TransactionAndOrderProdItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(
        checkProps(TransactionAndOrderProdItem, { data: createTransactionAndOrderProdItem() }),
      ).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(TransactionAndOrderProdItem, {})).not.toBe(null);
    });
  });

  describe('Checks how renders and behaviour', () => {
    it('Should render everything correctly', () => {
      const data = createTransactionAndOrderProdItem('p1', 'user1', 2, 9.9, 'productName', true);
      const { asFragment } = setUp(data);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render image src from orders collection', () => {
      const data = createTransactionAndOrderProdItem('p1', 'user1', 2, 5, 'productName', true);
      setUp(data, 'o1');
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute(
        'src',
        `${process.env.REACT_APP_API_URL}/orders/o1/p1/photo`,
      );
    });

    it('Should call push with correct paths after clicking product links', () => {
      const pushFn = jest.fn();
      const data = createTransactionAndOrderProdItem('p1');
      setUp(data, '', pushFn);

      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-photo'));
      expect(pushFn).toHaveBeenCalledWith('/product/p1');
      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-name'));
      expect(pushFn).toHaveBeenLastCalledWith('/product/p1');
      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
