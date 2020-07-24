import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from './Modal.sc';
import MyIcon from '../../UI/MyIcon/MyIcon';
import { ReactComponent as PlusIcon } from '../../../images/SVG/plus.svg';

const backdropVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: .25 },
  },
};

const modalVariants = {
  hidden: {
    top: '-20vh',
    x: '-50%',
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    top: '50%',
    y: '-50%',
    opacity: 1,
    transition: { delay: .2, stiffness: 120 },
    pointerEvents: 'initial',
  },
};

const Modal = (props) => {
  const { visible, closed, children } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <>
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closed}
            onKeyDown={closed}
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
            <div className="close-icon-box" onClick={closed}>
              <MyIcon size="small" className="close-icon"><PlusIcon /></MyIcon>
            </div>
            {children}
          </SC.Popup>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
