import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../styled/theme';
import Orders from './Orders';
import Loader from '../UI/Loader';
import PlainPanel from '../UI/Panels/PlainPanel';
import { TopPagination } from '../../styled/components';
import SortOrders from './SortOrders/SortOrders';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import OrderList from './OrderList/OrderList';
import BottomPagination from '../Pagination/BottomPagination/BottomPagination';
import {
  checkProps,
  createOrder,
  createTransactionAndOrderProdItem,
} from '../../shared/testUtility';
import { orderTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/my-account/placed-orders', search: '?p=1' },
};

const setUp = (orders, orderCount, type = orderTypes.PLACED_ORDERS) => {
  const props = {
    orders,
    type,
  };
  const store = mockStore({
    auth: { orderCount },
    ui: { isDataLoading: false },
  });
  return mount(
    <Router history={defaultHistory}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Orders {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<ProductItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        orders: [createOrder([{ _id: 'p1' }])],
        type: orderTypes.PLACED_ORDERS,
      };
      expect(checkProps(Orders, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(Orders, {})).not.toBeNull();
    });
  });

  describe('Check how everything render', () => {
    it('Should render <Loader />', () => {
      const wrapper = setUp(undefined, undefined);
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render problem with fetching when type is PLACED_ORDERS', () => {
      const wrapper = setUp(null, undefined, orderTypes.PLACED_ORDERS);
      expect(wrapper.find('[data-test="info-heading"]').first().text()).toEqual(
        'There is a problem to fetch your placed orders',
      );
    });

    it('Should render problem with fetching when type is SELL_HISTORY', () => {
      const wrapper = setUp(null, undefined, orderTypes.SELL_HISTORY);
      expect(wrapper.find('[data-test="info-heading"]').first().text()).toEqual(
        'There is a problem to fetch your sell history',
      );
    });

    it('Should render info that there is no orders when type is PLACED_ORDERS', () => {
      const wrapper = setUp([], 0, orderTypes.PLACED_ORDERS);
      expect(wrapper.find('[data-test="info-heading"]').first().text()).toEqual(
        `You don't have any placed orders yet`,
      );
    });

    it('Should render info that there is no orders when type is SELL_HISTORY', () => {
      const wrapper = setUp([], 0, orderTypes.SELL_HISTORY);
      expect(wrapper.find('[data-test="info-heading"]').first().text()).toEqual(
        `Your sell history is empty`,
      );
    });

    it('Should render full content', () => {
      const wrapper = setUp([createOrder([createTransactionAndOrderProdItem()])], 1);
      expect(wrapper.find(PlainPanel)).toHaveLength(1);
      expect(wrapper.find(TopPagination)).toHaveLength(1);
      expect(wrapper.find(SortOrders)).toHaveLength(1);
      expect(wrapper.find(InputPagination)).toHaveLength(1);
      expect(wrapper.find(OrderList)).toHaveLength(1);
      expect(wrapper.find(BottomPagination)).toHaveLength(1);
    });
  });
});
