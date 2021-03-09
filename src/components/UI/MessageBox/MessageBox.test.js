import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import MessageBox from './MessageBox';

const mockStore = configureMockStore([thunk]);

const setUp = (message) => {
  const store = mockStore({
    ui: { message },
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MessageBox />
      </ThemeProvider>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<MessageBox />', () => {
  it('Should render everything correctly', () => {
    const { asFragment } = setUp('test message');
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should NOT render anything', () => {
    const { asFragment } = setUp('');
    expect(asFragment()).toMatchSnapshot();
  });
});
