import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LandingPage from './LandingPage';
import theme from '../../styled/theme';
import * as actions from '../../store/actions/indexActions';
import { defaultAppPath, modalTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <LandingPage />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
    history,
  };
};

afterEach(cleanup);

describe('<LandingPage />', () => {
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

    it('should call push with default app path', () => {
      const { history } = setUp();
      fireEvent.click(screen.getByRole('button', { name: /view the products now/i }));
      expect(history.push).toHaveBeenCalledWith(defaultAppPath);
    });
  });
});
