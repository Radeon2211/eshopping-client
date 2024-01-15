import React from 'react';
import { waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Logout from './Logout';
import * as actions from '../../store/actions/indexActions';
import { renderAppPart } from '../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Logout />, {
      pathname: '/',
      store,
    }),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  logoutUser: () => {},
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<Logout />', () => {
  it('should navigate back and logoutUser()', async () => {
    const { store } = setUp();
    expect(mockedUseNavigateFn).toHaveBeenCalledWith(-1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.logoutUser());
    await waitFor(() => {
      expect(document.title).toEqual('Logging out...');
    });
  });
});
