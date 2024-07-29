import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Formik } from 'formik';
import Form from './Form';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  headingText: 'testHeadingText',
  btnText: 'submitText',
  isValid: true,
  cancellable: true,
  children: <div data-testid="Form-children" />,
};

const createStore = (isFormLoading, formError) => {
  const store = mockStore({
    ui: {
      isFormLoading,
      formError,
    },
  });
  store.dispatch = jest.fn();
  return store;
};

const defaultStore = createStore(false, 'testError');

const setUp = (props, store) => {
  return {
    ...renderAppPart(
      <Formik>
        <Form {...props} />
      </Formik>,
      {
        store,
      },
    ),
    store,
  };
};

describe('<Form />', () => {
  describe('check how renders', () => {
    it('should render heading with buttons', () => {
      setUp(defaultProps, defaultStore);
      expect(screen.getByText('testHeadingText')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i }));
      expect(screen.getByRole('button', { name: /submit/i }));
    });

    it('should NOT render heading, error and buttons', () => {
      const props = {
        ...defaultProps,
        headingText: '',
        btnText: '',
        cancellable: false,
      };
      const store = createStore(false, '');
      setUp(props, store);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render submit button without cancel button', () => {
      const props = {
        ...defaultProps,
        headingText: '',
        cancellable: false,
        btnColor: 'red',
      };
      const store = createStore(false, '');
      setUp(props, store);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: /submit/i }));
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

  describe('check redux action calls', () => {
    it('should call setModal() after cancel button click', () => {
      const { store } = setUp(defaultProps, defaultStore);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(null));
    });
  });
});
