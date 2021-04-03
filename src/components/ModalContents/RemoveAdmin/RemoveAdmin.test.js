import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RemoveAdmin from './RemoveAdmin';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({
    ui: {
      isFormLoading: false,
      formError: '',
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RemoveAdmin />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  removeAdmin: (email) => email,
}));

afterEach(cleanup);

describe('<RemoveAdmin />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('RemoveAdmin-email');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
    });

    it('should call removeAdmin() with given email after input submit and button click', async () => {
      const { store, container } = setUp();
      const emailInput = screen.getByTestId('RemoveAdmin-email');
      const testEmail = 'test@domain.com';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.removeAdmin(testEmail));

      await waitFor(() => {
        fireEvent.submit(emailInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.removeAdmin(testEmail));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should NOT call removeAdmin() if input is empty or email is not valid', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('RemoveAdmin-email');
      const testEmail = 'invalidemail';

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
