import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import theme from '../../../styled/theme';
import { defaultUserProfile } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';
import {
  defaultScrollToConfig,
  modalTypes,
  singleInfoNames,
  userStatuses,
} from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (profile, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { profile },
  });
  store.dispatch = jest.fn();

  const props = {
    history: {
      push: pushFn,
    },
  };

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MyData {...props} />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MyData />', () => {
  describe('check how renders', () => {
    it('should render everything correctly for non admin user with status active', async () => {
      const { asFragment } = setUp(defaultUserProfile);
      expect(asFragment()).toMatchSnapshot();
      await waitFor(() => {
        expect(document.title).toEqual('Your account data - E-Shopping');
      });
    });

    it('should render everything correctly for non admin user with status pending', () => {
      const { asFragment } = setUp({ ...defaultUserProfile, status: userStatuses.PENDING });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly for admin user', () => {
      const { asFragment } = setUp({ ...defaultUserProfile, isAdmin: true });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('check behaviour after clicking', () => {
    it('should call correct functions after clicking in admin and active user content', () => {
      const { store } = setUp({ ...defaultUserProfile, isAdmin: true });

      fireEvent.click(screen.getByRole('button', { name: /add admin/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(modalTypes.ADD_ADMIN));

      fireEvent.click(screen.getByRole('button', { name: /remove admin/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(modalTypes.REMOVE_ADMIN));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.NAME}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(3, actions.setModal(modalTypes.CHANGE_NAME));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.EMAIL}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(4, actions.setModal(modalTypes.CHANGE_EMAIL));

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.ADDRESS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        5,
        actions.setModal(modalTypes.CHANGE_ADDRESS),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.CONTACTS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        6,
        actions.setModal(modalTypes.CHANGE_CONTACTS),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        7,
        actions.setModal(modalTypes.CHANGE_PHONE_NUMBER),
      );

      fireEvent.click(screen.getByRole('button', { name: /change password/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        8,
        actions.setModal(modalTypes.CHANGE_PASSWORD),
      );

      fireEvent.click(screen.getByRole('button', { name: /delete account/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        9,
        actions.setModal(modalTypes.DELETE_ACCOUNT),
      );
    });

    it('should call correct functions after clicking in pending user content', () => {
      const pushFn = jest.fn();
      const { store } = setUp({ ...defaultUserProfile, status: userStatuses.PENDING }, pushFn);

      fireEvent.click(screen.getByRole('button', { name: /send verification link/i }));
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setModal(modalTypes.SEND_VERIFICATION_LINK),
      );

      fireEvent.click(screen.getByRole('button', { name: /logout/i }));
      expect(pushFn).toHaveBeenCalledWith('/logout');
    });
  });

  describe('check useEffect()', () => {
    it('should call scrollTo() after mounting', () => {
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
