import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import theme from '../../../../styled/theme';
import Dropdown from './Dropdown';
import { checkProps } from '../../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});

const setUp = (isVisible, closed = jest.fn(), pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: pushFn,
  };

  return render(
    <Provider store={defaultStore}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Dropdown isVisible={isVisible} closed={closed} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<Dropdown />', () => {
  describe('Check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        isVisible: true,
        closed: jest.fn(),
      };
      expect(checkProps(Dropdown, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(Dropdown, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp(true);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should NOT render anything', () => {
      const { asFragment } = setUp(false);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check general behaviour', () => {
    it('should call push with correct paths after clicking at links', () => {
      const pushFn = jest.fn();
      setUp(true, jest.fn(), pushFn);

      fireEvent.click(screen.getByTestId('Dropdown-my-account-data-link'));
      expect(pushFn).toHaveBeenCalledWith('/my-account/data');

      fireEvent.click(screen.getByTestId('Dropdown-my-account-products-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/my-account/products?p=1');

      fireEvent.click(screen.getByTestId('Dropdown-my-account-placed-orders-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/my-account/placed-orders?p=1');

      fireEvent.click(screen.getByTestId('Dropdown-my-account-sell-history-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/my-account/sell-history?p=1');

      fireEvent.click(screen.getByTestId('Dropdown-logout-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/logout');

      expect(pushFn).toHaveBeenCalledTimes(5);
    });

    it('should call closed after clicking outside if isVisible is true', () => {
      const closedFn = jest.fn();
      setUp(true, closedFn);

      userEvent.click(document.body);
      expect(closedFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call closed after clicking outside if isVisible is false', () => {
      const closedFn = jest.fn();
      setUp(false, closedFn);

      userEvent.click(document.body);
      expect(closedFn).not.toHaveBeenCalled();
    });

    it('should NOT call closed after clicking at <Dropdown />', () => {
      const closedFn = jest.fn();
      setUp(true, closedFn);

      userEvent.click(screen.getByTestId('Dropdown'));
      expect(closedFn).not.toHaveBeenCalled();
    });
  });
});
