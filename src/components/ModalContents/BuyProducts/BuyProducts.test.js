import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BuyProducts from './BuyProducts';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/transaction' },
  };

  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BuyProducts />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
    history,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  buyProducts: (history, lastPath) => ({
    history,
    lastPath,
  }),
}));

jest.mock('react-router-last-location', () => ({
  useLastLocation: () => ({
    pathname: '/cart',
  }),
}));

afterEach(cleanup);

describe('<BuyProducts />', () => {
  describe('Checks how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Checks behaviour after buttons clicks', () => {
    it('should call setModal() and buyProducts() after buttons clicks', () => {
      const { store, history } = setUp();

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('Cancel'));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(''));

      fireEvent.click(screen.getByText('Confirm'));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.buyProducts(history, '/cart'));
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
