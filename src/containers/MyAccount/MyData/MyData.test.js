import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import { defaultUserProfile, renderAppPart } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';
import { defaultScrollToConfig, singleInfoNames } from '../../../shared/constants';
import { ModalType, ProfileStatus } from '../../../shared/types/types';

const mockStore = configureMockStore([thunk]);

const setUp = (profile) => {
  const store = mockStore({
    auth: { profile },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<MyData />, { store }),
    store,
  };
};

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MyData />', () => {
  describe('check how renders', () => {
    it('should render correct document title', async () => {
      setUp(defaultUserProfile);
      await waitFor(() => {
        expect(document.title).toEqual('Your account data - E-Shopping');
      });
    });

    it('should render everything correctly for non admin user with status pending', () => {
      setUp({ ...defaultUserProfile, status: ProfileStatus.PENDING });
      expect(screen.getByTestId('MyData-pending-user-content')).toBeInTheDocument();
    });
  });

  describe('check behaviour after clicking', () => {
    it('should call correct functions after clicking in admin and active user content', () => {
      const { store } = setUp({ ...defaultUserProfile, isAdmin: true });

      fireEvent.click(screen.getByRole('button', { name: /add admin/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(ModalType.ADD_ADMIN));

      fireEvent.click(screen.getByRole('button', { name: /remove admin/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(ModalType.REMOVE_ADMIN));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.NAME}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(3, actions.setModal(ModalType.CHANGE_NAME));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.EMAIL}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(4, actions.setModal(ModalType.CHANGE_EMAIL));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.ADDRESS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(5, actions.setModal(ModalType.CHANGE_ADDRESS));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.CONTACTS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        6,
        actions.setModal(ModalType.CHANGE_CONTACTS),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        7,
        actions.setModal(ModalType.CHANGE_PHONE_NUMBER),
      );

      fireEvent.click(screen.getByRole('button', { name: /change password/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        8,
        actions.setModal(ModalType.CHANGE_PASSWORD),
      );

      fireEvent.click(screen.getByRole('button', { name: /delete account/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(9, actions.setModal(ModalType.DELETE_ACCOUNT));
    });

    it('should call correct functions after clicking in pending user content', () => {
      const { store } = setUp({ ...defaultUserProfile, status: ProfileStatus.PENDING });

      fireEvent.click(screen.getByRole('button', { name: /send verification link/i }));
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setModal(ModalType.SEND_VERIFICATION_LINK),
      );

      fireEvent.click(screen.getByRole('button', { name: /logout/i }));
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/logout');
    });
  });

  describe('check useEffect()', () => {
    it('should call scrollTo() after mounting', () => {
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
