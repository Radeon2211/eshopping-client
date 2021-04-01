import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ClearCart from './ClearCart';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ClearCart />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  clearCart: () => {},
}));

afterEach(cleanup);

describe('<ClearCart />', () => {
  describe('Checks how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Checks behaviour after buttons clicks', () => {
    it('should call setModal() after cancel button click', () => {
      const { store } = setUp();

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('cancel'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(''));
    });

    it('should call setModal() and clearCart() after clear button click', () => {
      const { store } = setUp();

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('clear'));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.clearCart());
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(''));
    });
  });
});
