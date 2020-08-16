import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Formik } from 'formik';
import theme from '../../../styled/theme';
import Form from './Form';
import Heading from '../Heading/Heading';
import { checkProps } from '../../../shared/utility';

const mockStore = configureMockStore([thunk]);

const setUpWrapper = (props, store) => {
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Formik>
          <Form {...props} />
        </Formik>
      </ThemeProvider>
    </Provider>,
  );
};

describe('<Form />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        children: <div />,
      };
      expect(checkProps(Form, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(Form, expectedProps)).not.toBeNull();
    });
  });

  describe('Complete props and redux values', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        headingText: 'testHeadingText',
        btnText: 'testBtnText',
        isValid: true,
        cancellable: true,
        children: <div />,
      };
      const store = mockStore({
        ui: {
          isFormLoading: true,
          formError: 'testError',
        },
      });
      wrapper = setUpWrapper(props, store);
    });
    it('Should render heading', () => {
      expect(wrapper.find(Heading)).toHaveLength(1);
    });
    it('Should render cancel button wrapper', () => {
      expect(wrapper.find('.cancel-button-box')).toHaveLength(1);
    });
    it('Should render error', () => {
      expect(wrapper.find('.error')).toHaveLength(1);
    });
    it('Should render buttons wrapper', () => {
      expect(wrapper.find('.buttons-box')).toHaveLength(1);
    });
  });

  describe('Incomplete props and redux values', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        children: <div />,
      };
      const store = mockStore({
        ui: {
          isFormLoading: false,
          formError: '',
        },
      });
      wrapper = setUpWrapper(props, store);
    });
    it('Should NOT render heading', () => {
      expect(wrapper.find(Heading)).toHaveLength(0);
    });
    it('Should NOT render cancel button wrapper', () => {
      expect(wrapper.find('.cancel-button-box')).toHaveLength(0);
    });
    it('Should NOT render error', () => {
      expect(wrapper.find('.error')).toHaveLength(0);
    });
    it('Should NOT render buttons wrapper', () => {
      expect(wrapper.find('.buttons-box')).toHaveLength(0);
    });
  });
});
