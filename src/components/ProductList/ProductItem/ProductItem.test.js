import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../../styled/theme';
import ProductItem from './ProductItem';
import { checkProps, createProductItem } from '../../../shared/testUtility/testUtility';
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
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(ProductItem, { data: createProductItem() })).toBeUndefined();
    });
    it('should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(ProductItem, expectedProps)).not.toBeNull();
    });
  });

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
      const { asFragment } = setUp(data);
      expect(asFragment()).toMatchSnapshot();
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
      const { asFragment } = setUp(data);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should NOT render buyer quantity, condition and should render default photo and price without decimals', () => {
      const data = createProductItem({
        buyerQuantity: 1,
        condition: productConditions.USED,
      });
      setUp(data);
      expect(screen.getByTestId('ProductItem-condition').textContent).toEqual('Condition: Used');
      expect(screen.getByTestId('ProductItem-buyer-quantity').textContent).toEqual(
        '1 person bought',
      );
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
