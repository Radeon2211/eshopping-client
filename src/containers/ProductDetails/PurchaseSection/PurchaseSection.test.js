import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PurchaseSection from './PurchaseSection';
import Button from '../../../components/UI/Button/Button';
import { checkProps, defaultUserProfile } from '../../../shared/testUtility';
import theme from '../../../styled/theme';

const mockStore = configureMockStore([thunk]);

const createStore = (cart, isCartLoading = false) =>
  mockStore({
    auth: { cart },
    ui: { isCartLoading },
  });

const defaultProps = {
  productId: 'productId',
  onSetModal: jest.fn(),
  userProfile: { ...defaultUserProfile, username: 'user2' },
  productSellerUsername: 'user1',
  productQuantity: 5,
};

const defaultCart = [{ quantity: 3, product: { _id: '123' } }];

const setUp = (props, cart = defaultCart, isLoading) => {
  const finalProps = props
    ? {
        ...defaultProps,
        ...props,
      }
    : defaultProps;
  const store = createStore(cart, isLoading);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <PurchaseSection {...finalProps} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<PurchaseSection />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(PurchaseSection, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(PurchaseSection, {})).not.toBe(null);
    });
  });

  describe('Check how overall section renders', () => {
    it('Should render quantity box and two buttons when seller and current user are different', () => {
      const wrapper = setUp();
      expect(wrapper.find('[data-test="choose-quantity-wrapper"]').length).toBeGreaterThan(0);
      expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('Should NOT render quantity box and two buttons & should render <SC.InfoToSeller /> when seller and current user are the same', () => {
      const wrapper = setUp({ userProfile: { ...defaultUserProfile, username: 'user1' } });
      expect(wrapper.find('[data-test="choose-quantity-wrapper"]')).toHaveLength(0);
      expect(wrapper.find(Button)).toHaveLength(0);
      expect(wrapper.find('[data-test="info-to-seller"]').length).toBeGreaterThan(0);
    });

    it('Should render not-able-to-add and only buy <Button /> if product quantity in cart equals to product quantity in db', () => {
      const wrapper = setUp(null, [{ quantity: 5, product: { _id: 'productId' } }]);
      expect(wrapper.find('[data-test="not-able-to-add"]').length).toBeGreaterThan(1);
      expect(wrapper.find(Button)).toHaveLength(1);
      expect(wrapper.find(Button).text()).toEqual('buy now');
    });
  });

  describe('Check how quantity number text renders', () => {
    it('Should render appropriate text when quantity is 1', () => {
      const wrapper = setUp({ productQuantity: 1 });
      expect(wrapper.find('[data-test="quantity"]').at(0).text()).toEqual('of 1 piece');
    });

    it('Should render appropriate text when quantity is 3', () => {
      const wrapper = setUp({ productQuantity: 3 });
      expect(wrapper.find('[data-test="quantity"]').at(0).text()).toEqual('of 3 pieces');
    });

    it('Should render appropriate text when quantity is 3 and 3 in cart', () => {
      const wrapper = setUp({ productQuantity: 3 }, [
        { quantity: 3, product: { _id: 'productId' } },
      ]);
      expect(wrapper.find('[data-test="quantity"]').at(0).text()).toEqual(
        'of 3 pieces (3 in cart)',
      );
    });

    it('Should render appropriate text when quantity is 5 and 3 in cart', () => {
      const wrapper = setUp(null, [{ quantity: 3, product: { _id: 'productId' } }]);
      expect(wrapper.find('[data-test="quantity"]').at(0).text()).toEqual(
        'of 5 pieces (3 in cart)',
      );
    });
  });
});
