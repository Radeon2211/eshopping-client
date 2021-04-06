import React from 'react';
import { mount } from 'enzyme';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import Modal from './Modal';
import theme from '../../../styled/theme';
import { modalTypes } from '../../../shared/constants';
import {
  defaultUserProfile,
  defaultDeliveryAddress,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  location: { pathname: '' },
};

afterEach(cleanup);

const setUpEnzyme = (modalContent = '', isFormLoading = false) => {
  const store = mockStore({
    ui: { modalContent, isFormLoading },
    auth: { profile: defaultUserProfile, deliveryAddress: defaultDeliveryAddress, cart: [] },
    product: { productDetails: {} },
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

const setUpRTL = (modalContent = '', isFormLoading = false) => {
  const store = mockStore({
    ui: { modalContent, isFormLoading },
    auth: { profile: defaultUserProfile, deliveryAddress: defaultDeliveryAddress, cart: [] },
    product: { productDetails: {} },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={defaultHistory}>
          <ThemeProvider theme={theme}>
            <Modal />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
  };
};

describe('<Modal />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUpRTL(modalTypes.ABOUT_WEBSITE, false);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should NOT render anything if modalContent is empty', () => {
      const { asFragment } = setUpRTL('');
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render <LoadingOverlay /> if isFormLoading true', () => {
      const wrapper = setUpEnzyme(modalTypes.ABOUT_WEBSITE, true);
      expect(wrapper.find('LoadingOverlay')).toHaveLength(1);
    });

    it('should render <AddProduct />', () => {
      const wrapper = setUpEnzyme(modalTypes.ADD_PRODUCT);
      expect(wrapper.find('AddProduct')).toHaveLength(1);
    });

    it('should render <AddAdmin />', () => {
      const wrapper = setUpEnzyme(modalTypes.ADD_ADMIN);
      expect(wrapper.find('AddAdmin')).toHaveLength(1);
    });

    it('should render <AboutWebsite />', () => {
      const wrapper = setUpEnzyme(modalTypes.ABOUT_WEBSITE);
      expect(wrapper.find('AboutWebsite')).toHaveLength(1);
    });

    it('should render <BuyProducts />', () => {
      const wrapper = setUpEnzyme(modalTypes.BUY_PRODUCTS);
      expect(wrapper.find('BuyProducts')).toHaveLength(1);
    });

    it('should render <CartItemAdded />', () => {
      const wrapper = setUpEnzyme(modalTypes.CART_ITEM_ADDED);
      expect(wrapper.find('CartItemAdded')).toHaveLength(1);
    });

    it('should render <BuyProducts />', () => {
      const wrapper = setUpEnzyme(modalTypes.BUY_PRODUCTS);
      expect(wrapper.find('BuyProducts')).toHaveLength(1);
    });

    it('should render <CartItemAdded />', () => {
      const wrapper = setUpEnzyme(modalTypes.CART_ITEM_ADDED);
      expect(wrapper.find('CartItemAdded')).toHaveLength(1);
    });

    it('should render <ChangeName />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_NAME);
      expect(wrapper.find('ChangeName')).toHaveLength(1);
    });

    it('should render <ChangeEmail />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_EMAIL);
      expect(wrapper.find('ChangeEmail')).toHaveLength(1);
    });

    it('should render <ChangePhoneNumber />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_PHONE_NUMBER);
      expect(wrapper.find('ChangePhoneNumber')).toHaveLength(1);
    });

    it('should render <ChangeAddress />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_ADDRESS);
      expect(wrapper.find('ChangeAddress')).toHaveLength(1);
    });

    it('should render <ChangeContacts />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_CONTACTS);
      expect(wrapper.find('ChangeContacts')).toHaveLength(1);
    });

    it('should render <ChangePassword />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_PASSWORD);
      expect(wrapper.find('ChangePassword')).toHaveLength(1);
    });

    it('should render <ChangeDeliveryAddress />', () => {
      const wrapper = setUpEnzyme(modalTypes.CHANGE_DELIVERY_ADDRESS);
      expect(wrapper.find('ChangeDeliveryAddress')).toHaveLength(1);
    });

    it('should render <ClearCart />', () => {
      const wrapper = setUpEnzyme(modalTypes.CLEAR_CART);
      expect(wrapper.find('ClearCart')).toHaveLength(1);
    });

    it('should render <DeleteAccount />', () => {
      const wrapper = setUpEnzyme(modalTypes.DELETE_ACCOUNT);
      expect(wrapper.find('DeleteAccount')).toHaveLength(1);
    });

    it('should render <DeleteProduct />', () => {
      const wrapper = setUpEnzyme(modalTypes.DELETE_PRODUCT);
      expect(wrapper.find('DeleteProduct')).toHaveLength(1);
    });

    it('should render <EditProduct />', () => {
      const wrapper = setUpEnzyme(modalTypes.EDIT_PRODUCT);
      expect(wrapper.find('EditProduct')).toHaveLength(1);
    });

    it('should render <Login />', () => {
      const wrapper = setUpEnzyme(modalTypes.LOGIN);
      expect(wrapper.find('Login')).toHaveLength(1);
    });

    it('should render <RemoveAdmin />', () => {
      const wrapper = setUpEnzyme(modalTypes.REMOVE_ADMIN);
      expect(wrapper.find('RemoveAdmin')).toHaveLength(1);
    });

    it('should render <ResetPassword />', () => {
      const wrapper = setUpEnzyme(modalTypes.RESET_PASSWORD);
      expect(wrapper.find('ResetPassword')).toHaveLength(1);
    });

    it('should render <PendingUserInfo />', () => {
      const wrapper = setUpEnzyme(modalTypes.PENDING_USER_INFO);
      expect(wrapper.find('PendingUserInfo')).toHaveLength(1);
    });

    it('should render <Signup />', () => {
      const wrapper = setUpEnzyme(modalTypes.SIGNUP);
      expect(wrapper.find('Signup')).toHaveLength(1);
    });

    it('should render <SendVerificationLink />', () => {
      const wrapper = setUpEnzyme(modalTypes.SEND_VERIFICATION_LINK);
      expect(
        wrapper.text().includes('Are you sure? Number of emails to be sent is very limited'),
      ).toEqual(true);
    });
  });

  describe('check redux actions calls', () => {
    it('should call setModal() after clicking at backdrop', () => {
      const { store } = setUpRTL(modalTypes.ABOUT_WEBSITE);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('Modal-backdrop'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(''));
    });

    it('should call setModal() after clicking at close icon', () => {
      const { store } = setUpRTL(modalTypes.ABOUT_WEBSITE);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('Modal-backdrop'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(''));
    });
  });
});
