import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import MyIcon from '../MyIcon';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';

export const SC = {};
SC.Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  max-width: 100%;
  padding: ${theme.spacings.level1} ${theme.spacings.level2};
  position: fixed;
  top: ${theme.spacings.level2};
  width: 60rem;
  z-index: ${theme.zIndexes.level5};
`;

SC.Message = styled(motion.div)`
  align-items: center;
  background-color: ${theme.colors.blue};
  box-shadow: ${theme.shadows.level3};
  color: #fff;
  display: flex;
  font-size: ${theme.fontSizes.level2};
  justify-content: space-between;
  margin: 0 ${theme.spacings.level2};
  text-align: justify;
  padding: ${theme.spacings.level1} ${theme.spacings.level2};
  width: 100%;
  word-break: break-word;

  & .close-icon {
    cursor: pointer;
    margin-left: ${theme.spacings.level1};
    transform: rotate(45deg);
  }

  @media only screen and (max-width: 37.5em) {
    font-size: ${theme.fontSizes.level3};
    padding: ${theme.spacings.level2};
  }
`;

export const messageBoxVariants = {
  hidden: {
    pointerEvents: 'none',
    y: '-200%',
  },
  visible: {
    transition: { type: 'spring', duration: theme.durations.level2, stiffness: 110 },
    pointerEvents: 'initial',
    y: 0,
  },
};

const MessageBox = () => {
  const message = useSelector((state) => state.ui.message);
  const dispatch = useDispatch();
  const onSetMessage = useCallback((msg) => dispatch(actions.setMessage(msg)), [dispatch]);

  return (
    <AnimatePresence exitBeforeEnter>
      {message && (
        <SC.Wrapper data-testid="MessageBox">
          <SC.Message
            variants={messageBoxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <span>{message}</span>
            <MyIcon
              size="small"
              color="#fff"
              onClick={() => onSetMessage('')}
              className="close-icon"
              data-testid="MessageBox-close-icon"
            >
              <PlusIcon />
            </MyIcon>
          </SC.Message>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default MessageBox;
