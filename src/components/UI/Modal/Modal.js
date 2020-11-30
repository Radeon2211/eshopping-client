import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import * as SC from './Modal.sc';
import MyIcon from '../MyIcon';
import LoadingOverlay from '../LoadingOverlay';
import { ReactComponent as PlusIcon } from '../../../images/SVG/plus.svg';
import { backdropVariants, modalVariants } from '../../../shared/framer';
import Signup from '../../ModalContents/Signup/Signup';
import Login from '../../ModalContents/Login';
import AddProduct from '../../ModalContents/AddProduct/AddProduct';
import DeleteProduct from '../../ModalContents/DeleteProduct';
import ChangeName from '../../ModalContents/ChangeName';
import ChangeEmail from '../../ModalContents/ChangeEmail';
import ChangePhoneNumber from '../../ModalContents/ChangePhoneNumber';
import ChangeAddress from '../../ModalContents/ChangeAddress';
import ChangeContacts from '../../ModalContents/ChangeContacts';
import ChangePassword from '../../ModalContents/ChangePassword';
import DeleteAccount from '../../ModalContents/DeleteAccount';

const Modal = () => {
  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);
  const modalContent = useSelector((state) => state.ui.modalContent);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isOpen, content) => dispatch(actions.setModal(isOpen, content)), [
    dispatch,
  ]);

  const loadingOverlay = isFormLoading ? (
    <LoadingOverlay alignLoader="center" loaderSize="small" zeroPadding />
  ) : null;

  let modalContentNode = null;
  switch (modalContent) {
    case modalTypes.SIGNUP:
      modalContentNode = <Signup />;
      break;
    case modalTypes.LOGIN:
      modalContentNode = <Login />;
      break;
    case modalTypes.ADD_PRODUCT:
      modalContentNode = <AddProduct />;
      break;
    case modalTypes.DELETE_PRODUCT:
      modalContentNode = <DeleteProduct />;
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
    case modalTypes.DELETE_ACCOUNT:
      modalContentNode = <DeleteAccount />;
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
            onClick={() => onSetModal(false, '')}
            onKeyDown={() => onSetModal(false, '')}
            tabIndex="0"
            role="button"
            aria-label="Close modal"
          />
          <SC.Popup variants={modalVariants} initial="hidden" animate="visible" exit="hidden">
            <MyIcon
              size="medium"
              rotation={45}
              onClick={() => onSetModal(false, '')}
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
