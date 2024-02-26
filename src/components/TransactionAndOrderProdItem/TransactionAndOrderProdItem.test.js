import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionAndOrderProdItem from './TransactionAndOrderProdItem';
import {
  createTransactionAndOrderProdItem,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';

const setUp = (data, orderId, pushFn = jest.fn()) => {
  return renderAppPart(<TransactionAndOrderProdItem data={data} orderId={orderId} />, {
    pathname: '/transaction',
    push: pushFn,
  });
};

describe('<TransactionAndOrderProdItem />', () => {
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
      const pushFn = jest.fn();
      setUp(data, 'o1', pushFn);

      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-photo'));
      testRouterPushCall(pushFn, 0, '/product/p1');

      fireEvent.click(screen.getByTestId('TransactionAndOrderProdItem-product-link-name'));
      testRouterPushCall(pushFn, 0, '/product/p1');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
