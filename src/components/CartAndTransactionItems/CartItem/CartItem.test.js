import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItem from './CartItem';
import theme from '../../../styled/theme';
import { checkProps, createCartItem } from '../../../shared/testUtility/testUtility';
import noPhoto from '../../../images/no-photo.png';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({});

const setUp = (data, isCartLoading = false, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/cart' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <CartItem data={data} isCartLoading={isCartLoading} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<CartItem />', () => {
  describe('Check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        data: { _id: 'i1' },
        isCartLoading: false,
      };
      expect(checkProps(CartItem, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(CartItem, {})).not.toBe(null);
    });
  });

  describe('Checks how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp(
        createCartItem({
          sellerUsername: 'user1',
          productId: 'p1',
          quantity: 5,
          productQuantity: 6,
          price: 299.98,
          photo: true,
          name: 'productName',
        }),
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should NOT render price per piece and should render default photo if photo is empty and available quantity is 1', () => {
      const data = createCartItem();
      setUp(data);
      expect(screen.queryByTestId('CartItem-price-per-piece')).not.toBeInTheDocument();
      expect(screen.getByAltText(data.product.name)).toHaveAttribute('src', noPhoto);
    });

    it('should call push with correct paths after clicking links', () => {
      const pushFn = jest.fn();
      const data = createCartItem({
        sellerUsername: 'user1',
        quantity: 5,
        productQuantity: 6,
        price: 299.98,
        photo: true,
        name: 'productName',
      });
      setUp(data, false, pushFn);

      fireEvent.click(screen.getByTestId('CartItem-product-link-photo'));
      expect(pushFn).toHaveBeenCalledWith(`/product/${data.product._id}`);
      fireEvent.click(screen.getByTestId('CartItem-product-link-name'));
      expect(pushFn).toHaveBeenLastCalledWith(`/product/${data.product._id}`);
      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
