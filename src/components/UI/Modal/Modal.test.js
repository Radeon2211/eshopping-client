import React from 'react';
import { mount } from 'enzyme';
import { render, cleanup } from '@testing-library/react';
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

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  location: { pathname: '' },
};

afterEach(cleanup);

const setUp = (isModalOpen, modalContent, isFormLoading) => {
  const store = mockStore({
    ui: { isModalOpen, modalContent, isFormLoading },
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

describe('<Modal />', () => {
  it('should render everything correctly', () => {
    const store = mockStore({
      ui: { isModalOpen: true, modalContent: modalTypes.ABOUT_WEBSITE, isFormLoading: false },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={defaultHistory}>
          <ThemeProvider theme={theme}>
            <Modal />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should NOT render anything if isModalOpen is false', () => {
    const store = mockStore({
      ui: { isModalOpen: false },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router history={defaultHistory}>
          <ThemeProvider theme={theme}>
            <Modal />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render <LoadingOverlay /> if isFormLoading true', () => {
    const wrapper = setUp(true, modalTypes.ABOUT_WEBSITE, true);
    expect(wrapper.find('LoadingOverlay')).toHaveLength(1);
  });

  it('should render <AddProduct />', () => {
    const wrapper = setUp(true, modalTypes.ADD_PRODUCT);
    expect(wrapper.find('AddProduct')).toHaveLength(1);
  });

  it('should render <AddAdmin />', () => {
    const wrapper = setUp(true, modalTypes.ADD_ADMIN);
    expect(wrapper.find('AddAdmin')).toHaveLength(1);
  });

  it('should render <AboutWebsite />', () => {
    const wrapper = setUp(true, modalTypes.ABOUT_WEBSITE);
    expect(wrapper.find('AboutWebsite')).toHaveLength(1);
  });

  it('should render <BuyProducts />', () => {
    const wrapper = setUp(true, modalTypes.BUY_PRODUCTS);
    expect(wrapper.find('BuyProducts')).toHaveLength(1);
  });

  it('should render <CartItemAdded />', () => {
    const wrapper = setUp(true, modalTypes.CART_ITEM_ADDED);
    expect(wrapper.find('CartItemAdded')).toHaveLength(1);
  });

  it('should render <BuyProducts />', () => {
    const wrapper = setUp(true, modalTypes.BUY_PRODUCTS);
    expect(wrapper.find('BuyProducts')).toHaveLength(1);
  });

  it('should render <CartItemAdded />', () => {
    const wrapper = setUp(true, modalTypes.CART_ITEM_ADDED);
    expect(wrapper.find('CartItemAdded')).toHaveLength(1);
  });

  it('should render <ChangeName />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_NAME);
    expect(wrapper.find('ChangeName')).toHaveLength(1);
  });

  it('should render <ChangeEmail />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_EMAIL);
    expect(wrapper.find('ChangeEmail')).toHaveLength(1);
  });

  it('should render <ChangePhoneNumber />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_PHONE_NUMBER);
    expect(wrapper.find('ChangePhoneNumber')).toHaveLength(1);
  });

  it('should render <ChangeAddress />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_ADDRESS);
    expect(wrapper.find('ChangeAddress')).toHaveLength(1);
  });

  it('should render <ChangeContacts />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_CONTACTS);
    expect(wrapper.find('ChangeContacts')).toHaveLength(1);
  });

  it('should render <ChangePassword />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_PASSWORD);
    expect(wrapper.find('ChangePassword')).toHaveLength(1);
  });

  it('should render <ChangeDeliveryAddress />', () => {
    const wrapper = setUp(true, modalTypes.CHANGE_DELIVERY_ADDRESS);
    expect(wrapper.find('ChangeDeliveryAddress')).toHaveLength(1);
  });

  it('should render <ClearCart />', () => {
    const wrapper = setUp(true, modalTypes.CLEAR_CART);
    expect(wrapper.find('ClearCart')).toHaveLength(1);
  });

  it('should render <DeleteAccount />', () => {
    const wrapper = setUp(true, modalTypes.DELETE_ACCOUNT);
    expect(wrapper.find('DeleteAccount')).toHaveLength(1);
  });

  it('should render <DeleteProduct />', () => {
    const wrapper = setUp(true, modalTypes.DELETE_PRODUCT);
    expect(wrapper.find('DeleteProduct')).toHaveLength(1);
  });

  it('should render <EditProduct />', () => {
    const wrapper = setUp(true, modalTypes.EDIT_PRODUCT);
    expect(wrapper.find('EditProduct')).toHaveLength(1);
  });

  it('should render <Login />', () => {
    const wrapper = setUp(true, modalTypes.LOGIN);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('should render <RemoveAdmin />', () => {
    const wrapper = setUp(true, modalTypes.REMOVE_ADMIN);
    expect(wrapper.find('RemoveAdmin')).toHaveLength(1);
  });

  it('should render <ResetPassword />', () => {
    const wrapper = setUp(true, modalTypes.RESET_PASSWORD);
    expect(wrapper.find('ResetPassword')).toHaveLength(1);
  });

  it('should render <PendingUserInfo />', () => {
    const wrapper = setUp(true, modalTypes.PENDING_USER_INFO);
    expect(wrapper.find('PendingUserInfo')).toHaveLength(1);
  });

  it('should render <Signup />', () => {
    const wrapper = setUp(true, modalTypes.SIGNUP);
    expect(wrapper.find('Signup')).toHaveLength(1);
  });

  it('should render <SendVerificationLink />', () => {
    const wrapper = setUp(true, modalTypes.SEND_VERIFICATION_LINK);
    expect(
      wrapper.text().includes('Are you sure? Number of emails to be sent is very limited'),
    ).toEqual(true);
  });
});
