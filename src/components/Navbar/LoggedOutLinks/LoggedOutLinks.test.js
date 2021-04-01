import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
  describe('Checks how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Checks behaviour after buttons clicks', () => {
    it('should call setModal() with login modal after login button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText('login'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.LOGIN));
    });

    it('should call setModal() with signup modal after signup button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText('signup'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.SIGNUP));
    });
  });
});
