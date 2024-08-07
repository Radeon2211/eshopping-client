import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Modal from './Modal';
import {
  defaultUserProfile,
  defaultDeliveryAddress,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';
import { ModalType } from '../../../shared/types/types';

const mockStore = configureMockStore([thunk]);

const setUp = (modalContent: ModalType | null = null, isFormLoading = false) => {
  const store = mockStore({
    ui: { modalContent, isFormLoading },
    auth: { profile: defaultUserProfile, deliveryAddress: defaultDeliveryAddress, cart: [] },
    product: { productDetails: {} },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Modal />, {
      store,
    }),
    store,
  };
};

describe('<Modal />', () => {
  describe('check how renders', () => {
    it('should render "about website" modal', () => {
      setUp(ModalType.ABOUT_WEBSITE, false);
      expect(screen.getByTestId('Modal')).toBeInTheDocument();
      expect(screen.getByText(/about website/i)).toBeInTheDocument();
    });

    it('should NOT render anything if modalContent is empty', () => {
      setUp(null);
      expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();
    });

    it('should render <LoadingOverlay /> if isFormLoading true', () => {
      setUp(ModalType.ABOUT_WEBSITE, true);
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
    });

    it('should render <AddProduct />', () => {
      setUp(ModalType.ADD_PRODUCT);
      expect(screen.getByText(/add product for sale/i)).toBeInTheDocument();
    });

    it('should render <AddAdmin />', () => {
      setUp(ModalType.ADD_ADMIN);
      expect(screen.getByText(/add admin/i)).toBeInTheDocument();
    });

    it('should render <AboutWebsite />', () => {
      setUp(ModalType.ABOUT_WEBSITE);
      expect(screen.getByText(/about website/i)).toBeInTheDocument();
    });

    it('should render <BuyProducts />', () => {
      setUp(ModalType.BUY_PRODUCTS);
      expect(screen.getByTestId('BuyProducts-heading')).toBeInTheDocument();
    });

    it('should render <CartItemAdded /> (loader by default)', () => {
      setUp(ModalType.CART_ITEM_ADDED);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should render <ChangeName />', () => {
      setUp(ModalType.CHANGE_NAME);
      expect(screen.getByText(/change your name/i)).toBeInTheDocument();
    });

    it('should render <ChangeEmail />', () => {
      setUp(ModalType.CHANGE_EMAIL);
      expect(screen.getByText(/change your email/i)).toBeInTheDocument();
    });

    it('should render <ChangePhoneNumber />', () => {
      setUp(ModalType.CHANGE_PHONE_NUMBER);
      expect(screen.getByText(/change your phone number/i)).toBeInTheDocument();
    });

    it('should render <ChangeAddress />', () => {
      setUp(ModalType.CHANGE_ADDRESS);
      expect(screen.getByText(/change your address/i)).toBeInTheDocument();
    });

    it('should render <ChangeContacts />', () => {
      setUp(ModalType.CHANGE_CONTACTS);
      expect(screen.getByText(/change your contacts visibility/i)).toBeInTheDocument();
    });

    it('should render <ChangePassword />', () => {
      setUp(ModalType.CHANGE_PASSWORD);
      expect(screen.getByText(/change your password/i)).toBeInTheDocument();
    });

    it('should render <ChangeDeliveryAddress />', () => {
      setUp(ModalType.CHANGE_DELIVERY_ADDRESS);
      expect(screen.getByText(/change your delivery address/i)).toBeInTheDocument();
    });

    it('should render <ClearCart />', () => {
      setUp(ModalType.CLEAR_CART);
      expect(screen.getByText(/clear the shopping cart/i)).toBeInTheDocument();
    });

    it('should render <DeleteAccount />', () => {
      setUp(ModalType.DELETE_ACCOUNT);
      expect(screen.getByText(/delete your account/i)).toBeInTheDocument();
    });

    it('should render <DeleteProduct />', () => {
      setUp(ModalType.DELETE_PRODUCT);
      expect(screen.getByTestId('DeleteProduct-heading')).toBeInTheDocument();
    });

    it('should render <EditProduct />', () => {
      setUp(ModalType.EDIT_PRODUCT);
      expect(screen.getByText(/edit a product/i)).toBeInTheDocument();
    });

    it('should render <Login />', () => {
      setUp(ModalType.LOGIN);
      expect(screen.getByText(/login to your account/i)).toBeInTheDocument();
    });

    it('should render <RemoveAdmin />', () => {
      setUp(ModalType.REMOVE_ADMIN);
      expect(screen.getByText(/remove admin/i)).toBeInTheDocument();
    });

    it('should render <ResetPassword />', () => {
      setUp(ModalType.RESET_PASSWORD);
      expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    });

    it('should render <PendingUserInfo />', () => {
      setUp(ModalType.PENDING_USER_INFO);
      expect(screen.getByText(/you need to activate your account/i)).toBeInTheDocument();
    });

    it('should render <Signup />', () => {
      setUp(ModalType.SIGNUP);
      expect(screen.getByText(/register new account/i)).toBeInTheDocument();
    });

    it('should render <SendVerificationLink />', () => {
      setUp(ModalType.SEND_VERIFICATION_LINK);
      expect(
        screen.getByText(/are you sure\? number of emails to be sent is very limited/i),
      ).toBeInTheDocument();
    });
  });

  describe('check redux actions calls', () => {
    it('should call setModal() after clicking at backdrop', () => {
      const { store } = setUp(ModalType.ABOUT_WEBSITE);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('Modal-backdrop'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(null));
    });

    it('should call setModal() after clicking at close icon', () => {
      const { store } = setUp(ModalType.ABOUT_WEBSITE);
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('Modal-backdrop'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(null));
    });
  });
});
