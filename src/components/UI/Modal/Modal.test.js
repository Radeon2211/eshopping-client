import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Modal from './Modal';
import * as SC from './Modal.sc';

const mockStore = configureMockStore([thunk]);

const setUp = (store) => {
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Modal />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<Modal />', () => {
  describe('Check if it renders correctly', () => {
    it('Should render modal wrapper with backdrop and popup', () => {
      const store = mockStore({
        ui: { isModalOpen: true },
      });
      const wrapper = setUp(store);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(1);
      expect(wrapper.find(SC.Popup)).toHaveLength(1);
    });
    it('Should NOT render modal wrapper with backdrop and popup', () => {
      const store = mockStore({
        ui: { isModalOpen: false },
      });
      const wrapper = setUp(store);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(0);
      expect(wrapper.find(SC.Popup)).toHaveLength(0);
    });
  });
});
