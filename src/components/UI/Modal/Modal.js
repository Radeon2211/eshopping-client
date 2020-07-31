import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as modalTypes from '../../../store/actions/modalTypes';
import * as SC from './Modal.sc';
import MyIcon from '../../UI/MyIcon/MyIcon';
import Loader from '../../UI/Loader/Loader';
import { ReactComponent as PlusIcon } from '../../../images/SVG/plus.svg';
import { backdropVariants, modalVariants } from '../../../shared/framer';
import Signup from '../../../containers/Forms/Signup/Signup';
import Login from '../../../containers/Forms/Login';

const Modal = () => {
  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);
  const modalContent = useSelector((state) => state.ui.modalContent);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)), [dispatch]);

  const loadingOverlay = isFormLoading ? <div className="loading-overlay"><Loader size="big" /></div> : null;

  let modalContentNode = null;
  switch (modalContent) {
    case modalTypes.SIGNUP:
      modalContentNode = <Signup />;
      break;
    case modalTypes.LOGIN:
      modalContentNode = <Login />;
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
          <SC.Popup
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <MyIcon size="medium" onClick={() => onSetModal(false, '')} className="close-icon"><PlusIcon /></MyIcon>
            {loadingOverlay}
            {modalContentNode}
          </SC.Popup>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
