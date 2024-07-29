import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './Modal.sc';
import MyIcon from '../MyIcon';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import AboutWebsite from '../../ModalContents/AboutWebsite/AboutWebsite';
import AddProduct from '../../ModalContents/AddProduct/AddProduct';
import AddAdmin from '../../ModalContents/AddAdmin/AddAdmin';
import BuyProducts from '../../ModalContents/BuyProducts/BuyProducts';
import CartItemAdded from '../../ModalContents/CartItemAdded/CartItemAdded';
import ChangeName from '../../ModalContents/ChangeName/ChangeName';
import ChangeEmail from '../../ModalContents/ChangeEmail/ChangeEmail';
import ChangePhoneNumber from '../../ModalContents/ChangePhoneNumber/ChangePhoneNumber';
import ChangeAddress from '../../ModalContents/ChangeAddress/ChangeAddress';
import ChangeContacts from '../../ModalContents/ChangeContacts/ChangeContacts';
import ChangePassword from '../../ModalContents/ChangePassword/ChangePassword';
import ChangeDeliveryAddress from '../../ModalContents/ChangeDeliveryAddress/ChangeDeliveryAddress';
import ClearCart from '../../ModalContents/ClearCart/ClearCart';
import DeleteAccount from '../../ModalContents/DeleteAccount/DeleteAccount';
import DeleteProduct from '../../ModalContents/DeleteProduct/DeleteProduct';
import EditProduct from '../../ModalContents/EditProduct/EditProduct';
import Login from '../../ModalContents/Login/Login';
import RemoveAdmin from '../../ModalContents/RemoveAdmin/RemoveAdmin';
import ResetPassword from '../../ModalContents/ResetPassword/ResetPassword';
import PendingUserInfo from '../../ModalContents/PendingUserInfo/PendingUserInfo';
import Signup from '../../ModalContents/Signup/Signup';
import SendVerificationLink from '../../ModalContents/SendVerificationLink/SendVerificationLink';
import { ModalType } from '../../../shared/types/types';

export const backdropVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level3 },
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    transition: { delay: theme.durations.level2 },
    pointerEvents: 'initial',
  },
};

export default function Modal() {
  const didMountRef = useRef(false);
  const location = useLocation();

  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const modalContent = useSelector((state) => state.ui.modalContent);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (content) => {
      dispatch(actions.setModal(content));
    },
    [dispatch],
  );

  useEffect(() => {
    if (modalContent && didMountRef.current) {
      onSetModal(null);
    }
    didMountRef.current = true;
  }, [location]);

  const loadingOverlay = isFormLoading ? <LoadingOverlay /> : null;

  let modalContentNode = null;
  switch (modalContent) {
    case ModalType.ADD_PRODUCT:
      modalContentNode = <AddProduct />;
      break;
    case ModalType.ADD_ADMIN:
      modalContentNode = <AddAdmin />;
      break;
    case ModalType.ABOUT_WEBSITE:
      modalContentNode = <AboutWebsite />;
      break;
    case ModalType.BUY_PRODUCTS:
      modalContentNode = <BuyProducts />;
      break;
    case ModalType.CART_ITEM_ADDED:
      modalContentNode = <CartItemAdded />;
      break;
    case ModalType.CHANGE_NAME:
      modalContentNode = <ChangeName />;
      break;
    case ModalType.CHANGE_EMAIL:
      modalContentNode = <ChangeEmail />;
      break;
    case ModalType.CHANGE_PHONE_NUMBER:
      modalContentNode = <ChangePhoneNumber />;
      break;
    case ModalType.CHANGE_ADDRESS:
      modalContentNode = <ChangeAddress />;
      break;
    case ModalType.CHANGE_CONTACTS:
      modalContentNode = <ChangeContacts />;
      break;
    case ModalType.CHANGE_PASSWORD:
      modalContentNode = <ChangePassword />;
      break;
    case ModalType.CHANGE_DELIVERY_ADDRESS:
      modalContentNode = <ChangeDeliveryAddress />;
      break;
    case ModalType.CLEAR_CART:
      modalContentNode = <ClearCart />;
      break;
    case ModalType.DELETE_ACCOUNT:
      modalContentNode = <DeleteAccount />;
      break;
    case ModalType.DELETE_PRODUCT:
      modalContentNode = <DeleteProduct />;
      break;
    case ModalType.EDIT_PRODUCT:
      modalContentNode = <EditProduct />;
      break;
    case ModalType.LOGIN:
      modalContentNode = <Login />;
      break;
    case ModalType.REMOVE_ADMIN:
      modalContentNode = <RemoveAdmin />;
      break;
    case ModalType.RESET_PASSWORD:
      modalContentNode = <ResetPassword />;
      break;
    case ModalType.PENDING_USER_INFO:
      modalContentNode = <PendingUserInfo />;
      break;
    case ModalType.SIGNUP:
      modalContentNode = <Signup />;
      break;
    case ModalType.SEND_VERIFICATION_LINK:
      modalContentNode = <SendVerificationLink />;
      break;
    default:
      break;
  }

  return (
    <AnimatePresence mode="wait">
      {modalContent && (
        <SC.Wrapper data-testid="Modal">
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => onSetModal(null)}
            onKeyDown={() => onSetModal(null)}
            tabIndex="0"
            role="button"
            aria-label="Close modal"
            data-testid="Modal-backdrop"
          />
          <SC.Popup
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            data-testid={`Modal-${modalContent}`}
          >
            <MyIcon
              $size="medium"
              $rotation={45}
              onClick={() => onSetModal(null)}
              className="close-icon"
              data-testid="Modal-close-icon"
            >
              <PlusIcon />
            </MyIcon>
            {loadingOverlay}
            {modalContentNode}
          </SC.Popup>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
}
