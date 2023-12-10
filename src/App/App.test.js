import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from '../axios';
import theme from '../styled/theme';
import App from './App';
import { defaultUserProfile } from '../shared/testUtility/testUtility';
import * as actions from '../store/actions/indexActions';
import { userStatuses } from '../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (userProfile, ui = { message: '', isFormLoading: false }, pathname = '/logout') => {
  const store = mockStore({
    auth: {
      profile: userProfile,
    },
    ui,
  });
  store.dispatch = jest.fn();

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname },
    goBack: jest.fn(),
  };

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../store/actions/indexActions.js', () => ({
  fetchProfile: () => {},
  logoutUser: () => {},
}));

afterEach(cleanup);

describe('<App />', () => {
  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    axiosMock.onGet('/csrf-token').reply(200, {
      csrfToken: 'token',
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});
    delete axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token'];
  });

  describe('check how renders', () => {
    it('should render version for user with active status', () => {
      setUp(defaultUserProfile);
      expect(screen.getByTestId('App-user-active')).toBeInTheDocument();
    });

    it('should render version for user with pending status', () => {
      setUp({
        ...defaultUserProfile,
        status: userStatuses.PENDING,
      });
      expect(screen.getByTestId('App-user-pending')).toBeInTheDocument();
    });

    it('should render server connection error if we do NOT wait for setting token in useEffect()', () => {
      setUp(null);
      expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toBeUndefined();
      expect(
        screen.getByText('Oops! Server connection error. Please try again later'),
      ).toBeInTheDocument();
    });

    it('should render loading screen', () => {
      setUp(undefined);
      expect(screen.getByTestId('App-loader')).toBeInTheDocument();
    });

    it('should render error from ErrorBoundary if data from redux ui reducer are not available', () => {
      setUp(defaultUserProfile, null);
      expect(screen.getByText('Something went wrong. Please refresh the page')).toBeInTheDocument();
      // expect(screen.getByTestId('App-error-boundary')).toBeInTheDocument();
    });
  });

  describe('check useEffect()', () => {
    it('should set token in useEffect() after waiting', async () => {
      setUp(null);
      expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toBeUndefined();
      await waitFor(() => {
        expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toEqual('token');
      });
    });

    it('should call fetchProfile() and axios.get(/csrf-token) successfully', async () => {
      const { store } = setUp(undefined);

      expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toBeUndefined();
      expect(store.dispatch).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledWith(actions.fetchProfile());
      });
      await waitFor(() => {
        expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toEqual('token');
      });
    });

    it('should call fetchProfile() successfully and axios.get(/csrf-token) NOT successfully', async () => {
      axiosMock.onGet('/csrf-token').reply(500);

      const { store } = setUp(undefined);

      expect(store.dispatch).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledWith(actions.fetchProfile());
      });
      await waitFor(() => {
        expect(axiosMock.axiosInstance.defaults.headers.post['X-CSRF-Token']).toBeUndefined();
      });
    });
  });
});
