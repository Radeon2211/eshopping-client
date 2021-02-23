import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import MessageBox, { SC } from './MessageBox';

const mockStore = configureMockStore([thunk]);

const setUp = (message) => {
  const store = mockStore({
    ui: { message },
  });
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MessageBox />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<MessageBox />', () => {
  it('Should render message wrapper and message component', () => {
    const wrapper = setUp('test message');
    expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    expect(wrapper.find(SC.Message)).toHaveLength(1);
  });

  it('Should NOT render modal wrapper with backdrop and popup', () => {
    const wrapper = setUp('');
    expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    expect(wrapper.find(SC.Message)).toHaveLength(0);
  });
});
