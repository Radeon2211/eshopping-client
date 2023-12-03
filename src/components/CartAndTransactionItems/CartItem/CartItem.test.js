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
import * as actions from '../../../store/actions/indexActions';
import noPhoto from '../../../images/no-photo.png';
import { updateCartActions } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (data, isCartLoading = false) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/cart' },
    push: jest.fn(),
  };

  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CartItem data={data} isCartLoading={isCartLoading} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
    history,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  removeCartItem: (itemId) => itemId,
  updateCartItem: (itemId, action, itemQuantity) => ({
    itemId,
    action,
    itemQuantity,
  }),
}));

afterEach(cleanup);

describe('<CartItem />', () => {
  const itemId = 'i1';
  const defaultData = createCartItem({
    id: itemId,
    sellerUsername: 'user1',
    productId: 'p1',
    quantity: 5,
    productQuantity: 6,
    price: 299.98,
    photo: true,
    name: 'productName',
  });

  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        data: defaultData,
        isCartLoading: false,
      };
      expect(checkProps(CartItem, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(CartItem, {})).not.toBe(null);
    });
  });

  describe('checks how renders', () => {
    it('should render everything correctly', () => {
      setUp(defaultData);
      expect(screen.getByTestId('CartItem-product-link-photo')).toBeInTheDocument();
      expect(screen.getByTestId('CartItem-product-link-name')).toHaveTextContent('productName');
      expect(screen.getByTestId('CartItem-available-quantity')).toHaveTextContent('of 6');
      expect(screen.getByTestId('CartItem-total-price')).toHaveTextContent('$1,499.90');
      expect(screen.getByTestId('CartItem-price-per-piece')).toHaveTextContent('per piece $299.98');
    });

    it('should NOT render price per piece and should render default photo if photo is empty and available quantity is 1', () => {
      const data = createCartItem();
      setUp(createCartItem());
      expect(screen.queryByTestId('CartItem-price-per-piece')).not.toBeInTheDocument();
      expect(screen.getByAltText(data.product.name)).toHaveAttribute('src', noPhoto);
    });
  });

  describe('check behaviour of history and calling redux actions', () => {
    it('should call push with correct paths after clicking links', () => {
      const { history } = setUp(defaultData, false);

      fireEvent.click(screen.getByTestId('CartItem-product-link-photo'));
      expect(history.push).toHaveBeenCalledWith(`/product/${defaultData.product._id}`);

      fireEvent.click(screen.getByTestId('CartItem-product-link-name'));
      expect(history.push).toHaveBeenLastCalledWith(`/product/${defaultData.product._id}`);

      expect(history.push).toHaveBeenCalledTimes(2);
    });

    it('should call removeCartItem() after clicking at trash icon', () => {
      const { store } = setUp(defaultData);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('CartItem-trash-icon'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.removeCartItem(itemId));
    });

    it('should call updateCartItem() after clicking at minus and plus buttons', () => {
      const { store } = setUp(defaultData);
      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.updateCartItem(itemId, updateCartActions.INCREMENT),
      );

      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.updateCartItem(itemId, updateCartActions.DECREMENT),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should call updateCartItem() after input blur', () => {
      const { store } = setUp(defaultData);
      expect(store.dispatch).not.toHaveBeenCalled();

      const input = screen.getByTestId('NumberInput-quantity');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 3 } });
      fireEvent.blur(input);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.updateCartItem(itemId, updateCartActions.NUMBER, 3),
      );

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.blur(input);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.updateCartItem(itemId, updateCartActions.NUMBER, 1),
      );
    });
  });
});
