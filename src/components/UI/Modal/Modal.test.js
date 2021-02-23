import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import Modal from './Modal';
import * as SC from './Modal.sc';
import theme from '../../../styled/theme';
import LoadingOverlay from '../LoadingOverlay';
import Signup from '../../ModalContents/Signup/Signup';
import Login from '../../ModalContents/Login';
import { modalTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  location: { pathname: '' },
};

const setUp = (isModalOpen, modalContent, isFormLoading) => {
  const store = mockStore({
    ui: { isModalOpen, modalContent, isFormLoading },
  });
  return mount(
    <Provider store={store}>
      <Router history={defaultHistory}>
        <ThemeProvider theme={theme}>
          <Modal />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<Modal />', () => {
  describe('Check if renders correctly', () => {
    it('Should render modal wrapper with backdrop and popup and <Signup /> form and <LoadingOverlay />', () => {
      const wrapper = setUp(true, modalTypes.SIGNUP, true);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(1);
      expect(wrapper.find(SC.Popup)).toHaveLength(1);
      expect(wrapper.find(Signup)).toHaveLength(1);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });

    it('Should NOT render modal wrapper with backdrop and popup', () => {
      const wrapper = setUp(false);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(0);
      expect(wrapper.find(SC.Popup)).toHaveLength(0);
    });

    it('Should render <Login /> form', () => {
      const wrapper = setUp(true, modalTypes.LOGIN);
      expect(wrapper.find(Login)).toHaveLength(1);
    });
  });
});
