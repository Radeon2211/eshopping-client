import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { messageBoxVariants } from '../../../shared/framer';
import MyIcon from '../MyIcon/MyIcon';
import { ReactComponent as PlusIcon } from '../../../images/SVG/plus.svg';

export const SC = {};
SC.Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  max-width: 100%;
  position: fixed;
  top: ${({ theme }) => theme.spacings.level2};
  width: 50rem;
  z-index: ${({ theme }) => theme.zIndexes.level4};
`;

SC.Message = styled(motion.div)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: ${({ theme }) => theme.shadows.level4};
  color: #fff;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.level2};
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.spacings.level2};
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  width: 100%;

  & .close-icon {
    cursor: pointer;
    transform: rotate(45deg);
  }

  @media only screen and (max-width: 37.5em) {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    padding: ${({ theme }) => theme.spacings.level2};
  }
`;

const MessageBox = () => {
  const message = useSelector((state) => state.ui.message);

  const dispatch = useDispatch();
  const onDeleteMessage = useCallback(() => dispatch(actions.deleteMessage()), [dispatch]);

  return (
    <AnimatePresence exitBeforeEnter>
      {message && (
        <SC.Wrapper>
          <SC.Message
            variants={messageBoxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {message}
            <MyIcon
              size="small"
              color="#fff"
              onClick={() => onDeleteMessage()}
              className="close-icon"
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
