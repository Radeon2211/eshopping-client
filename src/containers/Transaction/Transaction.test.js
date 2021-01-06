import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Transaction from './Transaction';
import ToPayInfo from '../../components/UI/ToPayInfo';
import SideBySide from '../../components/UI/SideBySide';
import Heading from '../../components/UI/Heading/Heading';
import theme from '../../styled/theme';
import { createTransactionItem } from '../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const createHistory = (length = 1, replace = jest.fn(), goBack = jest.fn()) => ({
  listen: jest.fn(),
  replace,
  goBack,
  createHref: jest.fn(),
  location: { pathname: '/transaction' },
  length,
});

const defaultHistory = createHistory();

const setUp = (transaction, history = defaultHistory) => {
  const store = mockStore({
    auth: { transaction, deliveryAddress: {} },
  });
  return mount(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Transaction />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

describe('<Transaction />', () => {
  describe('Check how everything render', () => {
    it('Should render content with correct pay value', () => {
      const transaction = [
        createTransactionItem('u1', 'user1', 'p1', 4, 10.6, 'product1'),
        createTransactionItem('u1', 'user1', 'p2', 6, 299.98, 'product2'),
      ];
      const wrapper = setUp(transaction);
      expect(wrapper.find(ToPayInfo).prop('value')).toEqual(1842.28);
      expect(wrapper.find(SideBySide).length).toBeGreaterThan(0);
      expect(wrapper.find(Heading).length).toBeGreaterThan(0);
    });

    it('Should render nothing if transaction is empty', () => {
      const transaction = [];
      const wrapper = setUp(transaction);
      expect(wrapper.find(SideBySide)).toHaveLength(0);
      expect(wrapper.find(Heading)).toHaveLength(0);
    });
  });

  describe('Check how history behaves', () => {
    it('Should replace path with cart if history length is lower than 3', () => {
      const replaceFn = jest.fn();
      const transaction = [];
      const history = createHistory(2, replaceFn);
      setUp(transaction, history);
      expect(replaceFn).toHaveBeenCalledWith('/cart');
    });

    it('Should go back if history length is at least 3', () => {
      const goBackFn = jest.fn();
      const transaction = [];
      const history = createHistory(3, undefined, goBackFn);
      setUp(transaction, history);
      expect(goBackFn).toHaveBeenCalled();
    });
  });
});
