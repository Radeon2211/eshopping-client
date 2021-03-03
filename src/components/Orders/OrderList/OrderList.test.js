import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderList from './OrderList';
import * as SC from './OrderList.sc';
import TransactionAndOrderProdItem from '../../TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import theme from '../../../styled/theme';
import {
  checkProps,
  createTransactionAndOrderProdItem,
  createOrder,
} from '../../../shared/testUtility';
import { orderTypes } from '../../../shared/constants';
import LoadingOverlay from '../../UI/LoadingOverlay';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const setUp = (orders, orderType, isDataLoading = false) => {
  const props = {
    orders,
    orderType,
  };
  const store = mockStore({
    ui: { isDataLoading },
  });
  return mount(
    <Router history={defaultHistory}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OrderList {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<OrderList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        orders: [{ _id: 'i1' }],
        orderType: orderTypes.PLACED_ORDERS,
      };
      expect(checkProps(OrderList, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(OrderList, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    describe('Buyer and seller field are defined', () => {
      it('Should render one <SC.SingleOrder /> with correct data and two <TransactionAndOrderProdItem /> when type is PLACED_ORDERS and should NOT render <LoadingOverlay />', () => {
        const products = [createTransactionAndOrderProdItem(), createTransactionAndOrderProdItem()];
        const orders = [
          createOrder(products, 'o1', 'sellerUser', 'buyerUser', 50.49, '2021-01-08T11:08:51.008Z'),
        ];
        const wrapper = setUp(orders, orderTypes.PLACED_ORDERS);

        expect(wrapper.find(SC.SingleOrder)).toHaveLength(1);
        expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
        const firstOrder = wrapper.find(SC.SingleOrder);

        expect(firstOrder.find('[data-test="user-link"]').at(0).prop('to')).toEqual(
          '/user/sellerUser?p=1',
        );
        expect(firstOrder.find('[data-test="user-link"]').at(0).text()).toEqual('sellerUser');
        expect(firstOrder.find('[data-test="username"]').at(0).text()).toEqual('seller sellerUser');
        expect(firstOrder.find('[data-test="date"]').at(0).text()).toEqual('8 Jan 2021, 12:08');
        expect(firstOrder.find('[data-test="details-link"]').at(0).prop('to')).toEqual('/order/o1');
        expect(firstOrder.find('[data-test="overall-order-price"]').at(0).text()).toEqual('$50.49');
        expect(firstOrder.find(TransactionAndOrderProdItem)).toHaveLength(2);
      });

      it('Should render two <SC.SingleOrder /> with correct data and one <TransactionAndOrderProdItem /> in each <SC.SingleOrder /> when type is SELL_HISTORY', () => {
        const products1 = [createTransactionAndOrderProdItem()];
        const products2 = [createTransactionAndOrderProdItem()];
        const orders = [
          createOrder(
            products1,
            'o1',
            'sellerUser1',
            'buyerUser1',
            111.1,
            '2021-01-07T23:08:51.008Z',
          ),
          createOrder(products2, 'o2', 'sellerUser2', 'buyerUser2', 40, '2021-01-09T02:08:51.008Z'),
        ];
        const wrapper = setUp(orders, orderTypes.SELL_HISTORY);

        expect(wrapper.find(SC.SingleOrder)).toHaveLength(2);
        const firstOrder = wrapper.find(SC.SingleOrder).at(0);
        const secondOrder = wrapper.find(SC.SingleOrder).at(1);

        expect(firstOrder.find('[data-test="user-link"]').at(0).prop('to')).toEqual(
          '/user/buyerUser1?p=1',
        );
        expect(firstOrder.find('[data-test="user-link"]').at(0).text()).toEqual('buyerUser1');
        expect(firstOrder.find('[data-test="username"]').at(0).text()).toEqual('buyer buyerUser1');
        expect(firstOrder.find('[data-test="date"]').at(0).text()).toEqual('8 Jan 2021, 00:08');
        expect(firstOrder.find('[data-test="details-link"]').at(0).prop('to')).toEqual('/order/o1');
        expect(firstOrder.find('[data-test="overall-order-price"]').at(0).text()).toEqual(
          '$111.10',
        );
        expect(firstOrder.find(TransactionAndOrderProdItem)).toHaveLength(1);

        expect(secondOrder.find('[data-test="user-link"]').first().prop('to')).toEqual(
          '/user/buyerUser2?p=1',
        );
        expect(secondOrder.find('[data-test="user-link"]').at(0).text()).toEqual('buyerUser2');
        expect(secondOrder.find('[data-test="username"]').at(0).text()).toEqual('buyer buyerUser2');
        expect(secondOrder.find('[data-test="date"]').at(0).text()).toEqual('9 Jan 2021, 03:08');
        expect(secondOrder.find('[data-test="details-link"]').at(0).prop('to')).toEqual(
          '/order/o2',
        );
        expect(secondOrder.find('[data-test="overall-order-price"]').at(0).text()).toEqual('$40');
        expect(secondOrder.find(TransactionAndOrderProdItem)).toHaveLength(1);
      });
    });

    it('Should render <LoadingOverlay />', () => {
      const wrapper = setUp([], orderTypes.PLACED_ORDERS, true);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });
  });

  describe('Buyer and seller fields are not defined', () => {
    it(`Should render info that seller's account has been deleted if type is PLACED_ORDERS`, () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [
        createOrder(products, 'o1', null, 'buyerUser', 50.49, '2021-01-08T11:08:51.008Z'),
      ];
      const wrapper = setUp(orders, orderTypes.PLACED_ORDERS);

      expect(wrapper.find(SC.SingleOrder)).toHaveLength(1);
      const firstOrder = wrapper.find(SC.SingleOrder);

      expect(firstOrder.find('[data-test="user-link"]')).toHaveLength(0);
      expect(firstOrder.find('[data-test="username"]').at(0).text()).toEqual(
        'seller (account has been deleted)',
      );
    });

    it(`Should render info that buyer's account has been deleted if type is SELL_HISTORY`, () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [
        createOrder(products, 'o1', 'sellerUser', null, 50.49, '2021-01-08T11:08:51.008Z'),
      ];
      const wrapper = setUp(orders, orderTypes.SELL_HISTORY);

      expect(wrapper.find(SC.SingleOrder)).toHaveLength(1);
      const firstOrder = wrapper.find(SC.SingleOrder);

      expect(firstOrder.find('[data-test="user-link"]')).toHaveLength(0);
      expect(firstOrder.find('[data-test="username"]').at(0).text()).toEqual(
        'buyer (account has been deleted)',
      );
    });
  });
});
