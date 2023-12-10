import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../../styled/theme';
import ProductItem from './ProductItem';
import { createProductItem } from '../../../shared/testUtility/testUtility';
import { productConditions } from '../../../shared/constants';

const setUp = (data) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <ProductItem data={data} />
        </ThemeProvider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<ProductItem />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const data = createProductItem({
        id: 'p1',
        sellerUsername: 'user1',
        price: 10.6,
        quantity: 4,
        name: 'product1',
        photo: true,
        buyerQuantity: 2,
        quantitySold: 5,
        description: 'description',
        condition: productConditions.NEW,
      });
      setUp(data);
      expect(screen.getByText(/product1/i));
      expect(screen.getByTestId('ProductItem-condition')).toHaveTextContent('Condition: New');
      expect(screen.getByTestId('ProductItem-price')).toHaveTextContent('$10.60');
      expect(screen.getByTestId('ProductItem-buyer-quantity')).toHaveTextContent('2 people bought');
    });

    it('should NOT render buyer quantity, condition and should render default photo and price without decimals', () => {
      const data = createProductItem({
        id: 'p1',
        sellerUsername: 'user1',
        price: 10,
        quantity: 4,
        name: 'product1',
        buyerQuantity: 0,
        quantitySold: 0,
        description: 'description',
        condition: productConditions.NOT_APPLICABLE,
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
        condition: productConditions.USED,
      });
      setUp(data);
      expect(screen.getByTestId('ProductItem-condition')).toHaveTextContent('Condition: Used');
      expect(screen.getByTestId('ProductItem-buyer-quantity')).toHaveTextContent('1 person bought');
    });
  });

  it('should push correct path after clicking at wrapper', () => {
    const data = createProductItem({
      id: 'p1',
    });
    const { history } = setUp(data);
    fireEvent.click(screen.getByTestId('ProductItem'));
    expect(history.push).toHaveBeenCalledWith('/product/p1');
  });
});
