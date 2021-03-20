import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Formik } from 'formik';
import theme from '../../../styled/theme';
import Form from './Form';
import { checkProps } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  headingText: 'testHeadingText',
  btnText: 'submitText',
  isValid: true,
  cancellable: true,
  children: <div data-testid="Form-children" />,
};

const createStore = (isFormLoading, formError) =>
  mockStore({
    ui: {
      isFormLoading,
      formError,
    },
  });

const defaultStore = createStore(false, 'testError');

const setUp = (props, store) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Formik>
          <Form {...props} />
        </Formik>
      </ThemeProvider>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<Form />', () => {
  describe('Check prop types', () => {
    it('should NOT throw a warning', () => {
      const expectedProps = {
        children: <div />,
      };
      expect(checkProps(Form, expectedProps)).toBeUndefined();
    });

    it('should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(Form, expectedProps)).not.toBeNull();
    });
  });

  describe('Check how renders', () => {
    it('should render everything what is possible with blue submit button', () => {
      const { asFragment } = setUp(defaultProps, defaultStore);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should NOT render heading, error and buttons', () => {
      const props = {
        ...defaultProps,
        headingText: '',
        btnText: '',
        cancellable: false,
      };
      const store = createStore(false, '');
      const { asFragment } = setUp(props, store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render red submit button without cancel button', () => {
      const props = {
        ...defaultProps,
        headingText: '',
        cancellable: false,
        btnColor: 'red',
      };
      const store = createStore(false, '');
      const { asFragment } = setUp(props, store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should submit button be disabled if isFormLoading is true', () => {
      const store = createStore(true, '');
      setUp(defaultProps, store);
      expect(screen.getByTestId('Form-submit-btn')).toBeDisabled();
    });

    it('should submit button be disabled if isValid is false', () => {
      const props = {
        ...defaultProps,
        isValid: false,
      };
      setUp(props, defaultStore);
      expect(screen.getByTestId('Form-submit-btn')).toBeDisabled();
    });

    it('should submit button NOT be disabled if isValid is true and isFormLoading is false', () => {
      setUp(defaultProps, defaultStore);
      expect(screen.getByTestId('Form-submit-btn')).not.toBeDisabled();
    });
  });
});
