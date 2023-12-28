import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import theme from '../../../../styled/theme';
import Dropdown from './Dropdown';
import { modalTypes } from '../../../../shared/constants';
import * as actions from '../../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = (isVisible, closed = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: jest.fn(),
  };

  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <Dropdown isVisible={isVisible} closed={closed} />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
    history,
    user: userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never }),
  };
};

describe('<Dropdown />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      setUp(true);
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument();
    });

    it('should NOT render anything if isVisible is false', () => {
      setUp(false);
      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();
    });
  });

  describe('check behaviour after clicking at options', () => {
    it('should call push with correct paths after clicking at links', () => {
      const { history } = setUp(true, jest.fn());

      fireEvent.click(screen.getByText(/my account/i));
      expect(history.push).toHaveBeenCalledWith('/my-account/data');

      fireEvent.click(screen.getByText(/my offers/i));
      expect(history.push).toHaveBeenLastCalledWith('/my-account/products?p=1');

      fireEvent.click(screen.getByText(/my sell history/i));
      expect(history.push).toHaveBeenLastCalledWith('/my-account/sell-history?p=1');

      fireEvent.click(screen.getByText(/placed orders/i));
      expect(history.push).toHaveBeenLastCalledWith('/my-account/placed-orders?p=1');

      fireEvent.click(screen.getByText(/log out/i));
      expect(history.push).toHaveBeenLastCalledWith('/logout');

      expect(history.push).toHaveBeenCalledTimes(5);
    });

    it('should call setModal() after add product option click', () => {
      const { store, history } = setUp(true, jest.fn());
      fireEvent.click(screen.getByText(/add product/i));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.ADD_PRODUCT));
      expect(history.push).not.toHaveBeenCalled();
    });
  });

  describe('check closing mechanism', () => {
    it('should call closed after clicking outside if isVisible is true', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(true, closedFn);

      await user.click(document.body);
      expect(closedFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call closed after clicking outside if isVisible is false', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(false, closedFn);

      await user.click(document.body);
      expect(closedFn).not.toHaveBeenCalled();
    });

    it('should NOT call closed after clicking at <Dropdown />', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(true, closedFn);

      await user.click(screen.getByTestId('Dropdown'), {}, { skipPointerEventsCheck: true });
      expect(closedFn).not.toHaveBeenCalled();
    });
  });
});
