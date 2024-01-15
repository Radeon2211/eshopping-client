import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LandingPage from './LandingPage';
import * as actions from '../../store/actions/indexActions';
import { modalTypes } from '../../shared/constants';
import { renderAppPart, testRouterPushCall } from '../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (pushFn = jest.fn()) => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<LandingPage />, {
      pathname: '/',
      push: pushFn,
      store,
    }),
    store,
  };
};

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
      const pushFn = jest.fn();
      setUp(pushFn);
      fireEvent.click(screen.getByRole('button', { name: /view the products now/i }));
      testRouterPushCall(pushFn, 0, '/products', '?p=1');
    });
  });
});
