import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductItem from './ProductItem';
import {
  createProductItem,
  renderAppPart,
  testRouterPushCall,
} from '../../../shared/testUtility/testUtility';
import { ProductCondition } from '../../../shared/types/enums';

const setUp = (data, pushFn = jest.fn()) => {
  return renderAppPart(<ProductItem data={data} />, {
    pathname: '/products',
    search: '?p=1',
    push: pushFn,
  });
};

describe('<ProductItem />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const data = createProductItem({
        _id: 'p1',
        price: 10.6,
        quantity: 4,
        name: 'product1',
        photo: true,
        buyerQuantity: 2,
        quantitySold: 5,
        description: 'description',
        condition: ProductCondition.NEW,
        seller: {
          username: 'user1',
        },
      });
      setUp(data);
      expect(screen.getByText(/product1/i));
      expect(screen.getByTestId('ProductItem-condition')).toHaveTextContent('Condition: New');
      expect(screen.getByTestId('ProductItem-price')).toHaveTextContent('$10.60');
      expect(screen.getByTestId('ProductItem-buyer-quantity')).toHaveTextContent('2 people bought');
    });

    it('should NOT render buyer quantity, condition and should render default photo and price without decimals', () => {
      const data = createProductItem({
        _id: 'p1',
        price: 10,
        quantity: 4,
        name: 'product1',
        buyerQuantity: 0,
        quantitySold: 0,
        description: 'description',
        condition: ProductCondition.NOT_APPLICABLE,
        seller: {
          username: 'user1',
        },
      });
      setUp(data);
      expect(screen.getByText(/product1/i));
      expect(screen.queryByTestId('ProductItem-condition')).not.toBeInTheDocument();
      expect(screen.getByTestId('ProductItem-price')).toHaveTextContent('$10');
      expect(screen.queryByTestId('ProductItem-buyer-quantity')).not.toBeInTheDocument();
    });

    it('should NOT render buyer quantity, condition and should render default photo and price without decimals', () => {
      const data = createProductItem({
        buyerQuantity: 1,
        condition: ProductCondition.USED,
      });
      setUp(data);
      expect(screen.getByTestId('ProductItem-condition')).toHaveTextContent('Condition: Used');
      expect(screen.getByTestId('ProductItem-buyer-quantity')).toHaveTextContent('1 person bought');
    });
  });

  it('should push correct path after clicking at wrapper', () => {
    const data = createProductItem({ _id: 'p1' });
    const pushFn = jest.fn();
    setUp(data, pushFn);
    fireEvent.click(screen.getByTestId('ProductItem'));
    testRouterPushCall(pushFn, 0, '/product/p1');
  });
});
