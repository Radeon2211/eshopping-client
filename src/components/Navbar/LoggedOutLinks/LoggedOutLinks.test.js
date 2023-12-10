import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoggedOutLinks from './LoggedOutLinks';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LoggedOutLinks />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

afterEach(cleanup);

describe('<LoggedOutLinks />', () => {
  describe('check behaviour after buttons clicks', () => {
    it('should call setModal() with login modal', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.LOGIN));
    });

    it('should call setModal() with signup modal', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /signup/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.SIGNUP));
    });
  });
});
