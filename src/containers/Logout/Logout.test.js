import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Logout from './Logout';
import theme from '../../styled/theme';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = (goBack = jest.fn()) => {
  const props = {
    history: {
      goBack,
    },
  };

  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Logout {...props} />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  logoutUser: () => {},
}));

afterEach(cleanup);

describe('<Logout />', () => {
  it('should call goBack and logoutUser()', () => {
    const goBackFn = jest.fn();
    const { store } = setUp(goBackFn);
    expect(goBackFn).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.logoutUser());
  });
});
