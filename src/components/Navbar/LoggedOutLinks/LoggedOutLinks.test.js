import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoggedOutLinks from './LoggedOutLinks';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<LoggedOutLinks />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

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
