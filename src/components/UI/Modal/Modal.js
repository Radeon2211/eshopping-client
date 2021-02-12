import React, { useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import * as SC from './Modal.sc';
import MyIcon from '../MyIcon';
import LoadingOverlay from '../LoadingOverlay';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import { backdropVariants, modalVariants } from '../../../shared/framer';
import AboutWebsite from '../../ModalContents/AboutWebsite';
import AddProduct from '../../ModalContents/AddProduct';
import AddAdmin from '../../ModalContents/AddAdmin';
import BuyProducts from '../../ModalContents/BuyProducts';
import CartItemAdded from '../../ModalContents/CartItemAdded/CartItemAdded';
import ChangeName from '../../ModalContents/ChangeName';
import ChangeEmail from '../../ModalContents/ChangeEmail';
import ChangePhoneNumber from '../../ModalContents/ChangePhoneNumber';
import ChangeAddress from '../../ModalContents/ChangeAddress';
import ChangeContacts from '../../ModalContents/ChangeContacts';
import ChangePassword from '../../ModalContents/ChangePassword';
import ChangeDeliveryAddress from '../../ModalContents/ChangeDeliveryAddress';
import ClearCart from '../../ModalContents/ClearCart';
import DeleteAccount from '../../ModalContents/DeleteAccount';
import DeleteProduct from '../../ModalContents/DeleteProduct';
import EditProduct from '../../ModalContents/EditProduct';
import Login from '../../ModalContents/Login';
import RemoveAdmin from '../../ModalContents/RemoveAdmin';
import ResetPassword from '../../ModalContents/ResetPassword';
import PendingUserInfo from '../../ModalContents/PendingUserInfo';
import Signup from '../../ModalContents/Signup/Signup';
import SendVerificationLink from '../../ModalContents/SendVerificationLink';

const Modal = () => {
  const history = useHistory();

  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);
  const modalContent = useSelector((state) => state.ui.modalContent);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isOpen) => {
      dispatch(actions.setModal(isOpen));
    },
    [dispatch],
  );

  useEffect(() => {
    return history.listen(() => onSetModal(false));
  }, [history, onSetModal]);

  const loadingOverlay = isFormLoading ? <LoadingOverlay /> : null;

  let modalContentNode = null;
  switch (modalContent) {
    case modalTypes.ADD_PRODUCT:
      modalContentNode = <AddProduct />;
      break;
    case modalTypes.ADD_ADMIN:
      modalContentNode = <AddAdmin />;
      break;
    case modalTypes.ABOUT_WEBSITE:
      modalContentNode = <AboutWebsite />;
      break;
    case modalTypes.BUY_PRODUCTS:
      modalContentNode = <BuyProducts />;
      break;
    case modalTypes.CART_ITEM_ADDED:
      modalContentNode = <CartItemAdded />;
      break;
    case modalTypes.CHANGE_NAME:
      modalContentNode = <ChangeName />;
      break;
    case modalTypes.CHANGE_EMAIL:
      modalContentNode = <ChangeEmail />;
      break;
    case modalTypes.CHANGE_PHONE_NUMBER:
      modalContentNode = <ChangePhoneNumber />;
      break;
    case modalTypes.CHANGE_ADDRESS:
      modalContentNode = <ChangeAddress />;
      break;
    case modalTypes.CHANGE_CONTACTS:
      modalContentNode = <ChangeContacts />;
      break;
    case modalTypes.CHANGE_PASSWORD:
      modalContentNode = <ChangePassword />;
      break;
    case modalTypes.CHANGE_DELIVERY_ADDRESS:
      modalContentNode = <ChangeDeliveryAddress />;
      break;
    case modalTypes.CLEAR_CART:
      modalContentNode = <ClearCart />;
      break;
    case modalTypes.DELETE_ACCOUNT:
      modalContentNode = <DeleteAccount />;
      break;
    case modalTypes.DELETE_PRODUCT:
      modalContentNode = <DeleteProduct />;
      break;
    case modalTypes.EDIT_PRODUCT:
      modalContentNode = <EditProduct />;
      break;
    case modalTypes.LOGIN:
      modalContentNode = <Login />;
      break;
    case modalTypes.REMOVE_ADMIN:
      modalContentNode = <RemoveAdmin />;
      break;
    case modalTypes.RESET_PASSWORD:
      modalContentNode = <ResetPassword />;
      break;
    case modalTypes.PENDING_USER_INFO:
      modalContentNode = <PendingUserInfo />;
      break;
    case modalTypes.SIGNUP:
      modalContentNode = <Signup />;
      break;
    case modalTypes.SEND_VERIFICATION_LINK:
      modalContentNode = <SendVerificationLink />;
      break;
    default:
      break;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && (
        <SC.Wrapper>
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => onSetModal(false)}
            onKeyDown={() => onSetModal(false)}
            tabIndex="0"
            role="button"
            aria-label="Close modal"
          />
          <SC.Popup variants={modalVariants} initial="hidden" animate="visible" exit="hidden">
            <MyIcon
              size="medium"
              rotation={45}
              onClick={() => onSetModal(false)}
              className="close-icon"
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
};

export default Modal;
