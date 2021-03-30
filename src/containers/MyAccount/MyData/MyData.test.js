import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import theme from '../../../styled/theme';
import { defaultUserProfile } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes, singleInfoNames } from '../../../shared/constants';

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

jest.mock('../../../store/actions/indexActions.js', () => ({
  setModal: jest.fn().mockImplementation((isModalOpen, modalContent) => ({
    isModalOpen,
    modalContent,
  })),
}));

afterEach(cleanup);

describe('<MyData />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly for non admin user with status active', () => {
      const { asFragment } = setUp(defaultUserProfile);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly for non admin user with status pending', () => {
      const { asFragment } = setUp({ ...defaultUserProfile, status: 'pending' });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly for admin user', () => {
      const { asFragment } = setUp({ ...defaultUserProfile, isAdmin: true });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check behaviour after clicking', () => {
    it('should call correct functions after clicking in admin and active user content', () => {
      const { store } = setUp({ ...defaultUserProfile, isAdmin: true });

      fireEvent.click(screen.getByText('Add admin'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.setModal(true, modalTypes.ADD_ADMIN),
      );

      fireEvent.click(screen.getByText('Remove admin'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.setModal(true, modalTypes.REMOVE_ADMIN),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.NAME}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        3,
        actions.setModal(true, modalTypes.CHANGE_NAME),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.EMAIL}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        4,
        actions.setModal(true, modalTypes.CHANGE_EMAIL),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.ADDRESS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        5,
        actions.setModal(true, modalTypes.CHANGE_ADDRESS),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.CONTACTS}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        6,
        actions.setModal(true, modalTypes.CHANGE_CONTACTS),
      );

      fireEvent.click(screen.getByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}-btn`));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        7,
        actions.setModal(true, modalTypes.CHANGE_PHONE_NUMBER),
      );

      fireEvent.click(screen.getByText('Change password'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        8,
        actions.setModal(true, modalTypes.CHANGE_PASSWORD),
      );

      fireEvent.click(screen.getByText('Delete account'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        9,
        actions.setModal(true, modalTypes.DELETE_ACCOUNT),
      );
    });

    it('should call correct functions after clicking in pending user content', () => {
      const pushFn = jest.fn();
      const { store } = setUp({ ...defaultUserProfile, status: 'pending' }, pushFn);

      fireEvent.click(screen.getByText('Send verification link'));
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setModal(true, modalTypes.SEND_VERIFICATION_LINK),
      );

      fireEvent.click(screen.getByText('Logout'));
      expect(pushFn).toHaveBeenCalledWith('/logout');
    });
  });
});
