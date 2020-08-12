import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as modalTypes from '../../../store/actions/modalTypes';
import * as SC from './Modal.sc';
import MyIcon from '../MyIcon/MyIcon';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { ReactComponent as PlusIcon } from '../../../images/SVG/plus.svg';
import { backdropVariants, modalVariants } from '../../../shared/framer';
import Signup from '../../../containers/Forms/Signup/Signup';
import Login from '../../../containers/Forms/Login';
import AddProduct from '../../../containers/Forms/AddProduct/AddProduct';

const Modal = () => {
  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);
  const modalContent = useSelector((state) => state.ui.modalContent);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isOpen, content) => dispatch(actions.setModal(isOpen, content)), [
    dispatch,
  ]);

  const loadingOverlay = isFormLoading ? (
    <LoadingOverlay alignLoader="center" loaderSize="small" />
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
            <MyIcon size="medium" onClick={() => onSetModal(false, '')} className="close-icon">
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
