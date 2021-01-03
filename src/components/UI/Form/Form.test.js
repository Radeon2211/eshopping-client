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
import { checkProps } from '../../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  headingText: 'testHeadingText',
  btnText: 'testBtnText',
  isValid: true,
  cancellable: true,
  children: <div />,
};

const defaultStore = mockStore({
  ui: {
    isFormLoading: true,
    formError: 'testError',
  },
});

const setUp = (props, store) => {
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

  describe('Complete props (without btnColor) and redux values', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp(defaultProps, defaultStore);
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

  describe('Check if submit button color is correct', () => {
    it('Should render red submit button', () => {
      const props = {
        ...defaultProps,
        btnColor: 'red',
      };
      const wrapper = setUp(props, defaultStore);
      expect(wrapper.find('[data-test="submit-btn"]').first().prop('color')).toEqual('red');
    });

    it('Should render blue submit button', () => {
      const wrapper = setUp(defaultProps, defaultStore);
      expect(wrapper.find('[data-test="submit-btn"]').first().prop('color')).toEqual('blue');
    });
  });

  describe('Incomplete props and redux values and btnColor = red', () => {
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
      wrapper = setUp(props, store);
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
