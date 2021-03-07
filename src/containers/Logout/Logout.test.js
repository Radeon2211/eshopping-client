import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Logout from './Logout';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({});

const setUp = (goBack = jest.fn()) => {
  const props = {
    history: {
      goBack,
    },
  };

  return render(
    <Provider store={defaultStore}>
      <ThemeProvider theme={theme}>
        <Logout {...props} />
      </ThemeProvider>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<Logout />', () => {
  it('Should call goBack', () => {
    const goBackFn = jest.fn();
    setUp(goBackFn);
    expect(goBackFn).toHaveBeenCalledTimes(1);
  });
});
