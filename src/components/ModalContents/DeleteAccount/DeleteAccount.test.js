import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteAccount from './DeleteAccount';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton, renderAppPart } from '../../../shared/testUtility/testUtility';

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
    ...renderAppPart(<DeleteAccount />, {
      pathname: '/my-account/data',
      store,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  deleteAccount: (credentials, currentHistory) => ({
    credentials,
    currentHistory,
  }),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<DeleteAccount />', () => {
  describe('check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const currentPasswordInput = screen.getByTestId('DeleteAccount-current-password');
      expect(currentPasswordInput).toHaveFocus();
      expect(currentPasswordInput.value).toEqual('');
    });

    it('should call deleteAccount() with given password after input submit and button click', async () => {
      const { store, container } = setUp();

      const currentPasswordInput = screen.getByTestId('DeleteAccount-current-password');
      const currentPassword = 'password';

      await waitFor(() => {
        fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
      });
      expect(currentPasswordInput.value).toEqual(currentPassword);

      await clickAtSubmitButton(container);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.deleteAccount({ currentPassword }, mockedUseNavigateFn),
      );

      await waitFor(() => {
        fireEvent.submit(currentPasswordInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.deleteAccount({ currentPassword }, mockedUseNavigateFn),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should NOT call deleteAccount() if input is empty', async () => {
      const { store, container } = setUp();
      await clickAtSubmitButton(container);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
