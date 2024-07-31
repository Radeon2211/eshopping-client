import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PurchaseSection from './PurchaseSection';
import { defaultUserProfile, renderAppPart } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';
import { ModalType, ProfileStatus } from '../../../shared/types/types';

const mockStore = configureMockStore([thunk]);

const createStore = (cart, isCartLoading = false) =>
  mockStore({
    auth: { cart },
    ui: { isCartLoading },
  });

const defaultProps = {
  productId: '123',
  onSetModal: jest.fn(),
  userProfile: { ...defaultUserProfile, username: 'user1' },
  productSellerUsername: 'user2',
  productQuantity: 5,
};

const defaultCart = [{ quantity: 3, product: { _id: '123' } }];

const setUp = (props = {}, cart = defaultCart, isLoading = false) => {
  const finalProps = props
    ? {
        ...defaultProps,
        ...props,
      }
    : defaultProps;

  const store = createStore(cart, isLoading);
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<PurchaseSection {...finalProps} />, {
      pathname: `/product/123`,
      store,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  addCartItem: (item) => item,
  goToTransaction: (currentHistory, item) => ({
    currentHistory,
    item,
  }),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<PurchaseSection />', () => {
  describe('check how renders', () => {
    it('should render not able to add info if quantity in cart equals to product quantity', () => {
      const props = {
        productQuantity: 3,
      };
      setUp(props);
      expect(screen.getByTestId('PurchaseSection-not-able-to-add')).toBeInTheDocument();
    });

    it('should NOT render info about quantity in cart if given product is not in cart', () => {
      setUp(defaultProps, []);
      expect(screen.queryByTestId('PurchaseSection-quantity-in-cart')).not.toBeInTheDocument();
    });

    it('should render quantity info - "of 1 piece (1 in cart)"', () => {
      const props = {
        productQuantity: 1,
      };
      const cart = [{ quantity: 1, product: { _id: '123' } }];
      setUp(props, cart);
      expect(screen.getByTestId('PurchaseSection-product-quantity')).toHaveTextContent(
        'of 1 piece (1 in cart)',
      );
    });
  });

  describe('check calling of onSetModal()', () => {
    it('should NOT call after click on "buy now" and "add to cart" if user has status active', () => {
      const onSetModalFn = jest.fn();
      const props = {
        onSetModal: onSetModalFn,
      };
      setUp(props);

      fireEvent.click(screen.getByRole('button', { name: /buy now/i }));
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(onSetModalFn).not.toHaveBeenCalled();
    });

    it('should call with ModalType.LOGIN after click on "buy now" and "add to cart" if user is unauthenticated', () => {
      const onSetModalFn = jest.fn();
      const props = {
        onSetModal: onSetModalFn,
        userProfile: null,
      };
      setUp(props);

      fireEvent.click(screen.getByRole('button', { name: /buy now/i }));
      expect(onSetModalFn).toHaveBeenCalledWith(ModalType.LOGIN);
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(onSetModalFn).toHaveBeenLastCalledWith(ModalType.LOGIN);
      expect(onSetModalFn).toHaveBeenCalledTimes(2);
    });

    it('should call with ModalType.PENDING_USER_INFO after click on "buy now" and "add to cart" if user has status pending', () => {
      const onSetModalFn = jest.fn();
      const props = {
        onSetModal: onSetModalFn,
        userProfile: { ...defaultUserProfile, status: ProfileStatus.PENDING },
      };
      setUp(props);

      fireEvent.click(screen.getByRole('button', { name: /buy now/i }));
      expect(onSetModalFn).toHaveBeenCalledWith(ModalType.PENDING_USER_INFO);
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(onSetModalFn).toHaveBeenLastCalledWith(ModalType.PENDING_USER_INFO);
      expect(onSetModalFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('check behaviour of <ChooseQuantity /> (min - 1, max - 5)', () => {
    it('should change value to 5', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      expect(input).toHaveAttribute('value', '1');
      fireEvent.input(input, { target: { value: 5 } });
      expect(input).toHaveAttribute('value', '5');
    });

    it('should NOT change value to -1 and stay at 1', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      fireEvent.input(input, { target: { value: '-1' } });
      expect(input).toHaveAttribute('value', '1');
    });

    it('should NOT change value to 6 (more than product quantity) and stay at 1', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      fireEvent.input(input, { target: { value: 6 } });
      expect(input).toHaveAttribute('value', '1');
    });

    it('should increment value to 2 after clicking plus button and decrement to 1 after clicking minus button', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(input).toHaveAttribute('value', '2');
      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(input).toHaveAttribute('value', '1');
    });

    it('should NOT decrement value to 0 after clicking minus button', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(input).toHaveAttribute('value', '1');
    });

    it('should increment value to 5 instead of 6 after clicking plus button five times', () => {
      setUp();
      const input = screen.getByTestId('NumberInput-quantity');
      for (let i = 0; i < 5; i += 1) {
        fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      }
      expect(input).toHaveAttribute('value', '5');
    });
  });

  describe('check redux actions calling', () => {
    it('should call addCartItem() and goToTransaction() with quantity 2 after buttons clicks', () => {
      const { store } = setUp();

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));

      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.addCartItem({
          quantity: 2,
          product: defaultProps.productId,
        }),
      );

      fireEvent.click(screen.getByRole('button', { name: /buy now/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.goToTransaction(mockedUseNavigateFn, {
          quantity: 2,
          product: defaultProps.productId,
        }),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
