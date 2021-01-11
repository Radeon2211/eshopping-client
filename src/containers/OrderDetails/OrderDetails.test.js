import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import OrderDetails from './OrderDetails';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import * as SC from './OrderDetails.sc';
import Loader from '../../components/UI/Loader';
import TransactionAndOrderProdItem from '../../components/TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import {
  checkProps,
  createOrder,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
} from '../../shared/testUtility';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  match: {
    params: { id: '123' },
  },
};

const setUp = (orderDetails, props = defaultProps) => {
  const store = mockStore({
    auth: { orderDetails },
  });
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <OrderDetails {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<OrderDetails />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(OrderDetails, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(OrderDetails, {})).not.toBe(null);
    });
  });

  describe('Check how everything render', () => {
    it('Should render <Loader /> if orderDetails is undefined', () => {
      const wrapper = setUp(undefined);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find('[data-test="not-found"]')).toHaveLength(0);
    });

    it('Should render not-found <Heading /> if orderDetails is null', () => {
      const wrapper = setUp(null);
      expect(wrapper.find(Loader)).toHaveLength(0);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
    });

    describe('Buyer and seller are defined', () => {
      it('Should render correctly with two <TransactionAndOrderProdItem />', () => {
        const products = [createTransactionAndOrderProdItem(), createTransactionAndOrderProdItem()];
        const orderDetails = createOrder(
          products,
          'o1',
          'sellerUser',
          'buyerUser',
          111.1,
          '2021-01-11T12:32:51.008Z',
          'sellerEmail',
          '123',
        );

        const wrapper = setUp({
          ...orderDetails,
          deliveryAddress: defaultDeliveryAddress,
        });

        expect(wrapper.find(Loader)).toHaveLength(0);
        expect(wrapper.find('[data-test="not-found"]')).toHaveLength(0);

        expect(wrapper.find('[data-test="general-info-section"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="delivery-address-section"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="info-about-seller-section"]').length).toBeGreaterThan(0);

        expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
        expect(wrapper.find(PlainPanel)).toHaveLength(1);

        expect(wrapper.find('[data-test="order-id"]').at(0).text()).toEqual('o1');
        expect(wrapper.find('[data-test="transaction-date"]').at(0).text()).toEqual(
          '11 Jan 2021, 13:32',
        );
        expect(wrapper.find('[data-test="buyer-username"]').at(0).text()).toEqual('buyerUser');
        expect(wrapper.find('[data-test="buyer-link"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="buyer-link"]').at(0).prop('to')).toEqual(
          `/user/buyerUser?p=1`,
        );

        expect(wrapper.find('[data-test="seller-info"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="seller-username"]').at(0).text()).toEqual('sellerUser');
        expect(wrapper.find('[data-test="seller-link"]').at(0).prop('to')).toEqual(
          `/user/sellerUser?p=1`,
        );
        expect(wrapper.find('[data-test="seller-email"]').at(0).text()).toEqual('sellerEmail');
        expect(wrapper.find('[data-test="seller-phone"]').at(0).text()).toEqual('123');

        expect(wrapper.find(TransactionAndOrderProdItem)).toHaveLength(2);
        expect(wrapper.find('.total-price-value').text()).toEqual('$111.10');
      });
    });

    describe('Buyer and seller are defined', () => {
      it(`Should render info that seller's account has been deleted`, () => {
        const products = [createTransactionAndOrderProdItem()];
        const orderDetails = createOrder(
          products,
          'o1',
          null,
          null,
          111.1,
          '2021-01-11T12:32:51.008Z',
        );

        const wrapper = setUp({
          ...orderDetails,
          deliveryAddress: defaultDeliveryAddress,
        });

        expect(wrapper.find(Loader)).toHaveLength(0);
        expect(wrapper.find('[data-test="not-found"]')).toHaveLength(0);

        expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
        expect(wrapper.find(PlainPanel)).toHaveLength(1);

        expect(wrapper.find('[data-test="general-info-section"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="delivery-address-section"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="info-about-seller-section"]').length).toBeGreaterThan(0);

        expect(wrapper.find('[data-test="order-id"]').at(0).text()).toEqual('o1');
        expect(wrapper.find('[data-test="transaction-date"]').at(0).text()).toEqual(
          '11 Jan 2021, 13:32',
        );
        expect(wrapper.find('[data-test="buyer-username"]').at(0).text()).toEqual(
          '(account has been deleted)',
        );
        expect(wrapper.find('[data-test="buyer-link"]')).toHaveLength(0);

        expect(wrapper.find('[data-test="seller-info"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="seller-username"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="seller-link"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="seller-email"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="seller-phone"]')).toHaveLength(0);

        expect(wrapper.find('[data-test="seller-deleted"]').at(0).text()).toEqual(
          '(account has been deleted)',
        );
      });
    });
  });
});
