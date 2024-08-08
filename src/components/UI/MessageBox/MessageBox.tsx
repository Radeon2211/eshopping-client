import { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as SC from './MessageBox.sc';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import MyIcon from '../MyIcon';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import { useTypedDispatch, useTypedSelector } from '../../../store/reducers/rootReducer';

export const messageBoxVariants = {
  hidden: {
    y: '-200%',
  },
  visible: {
    transition: { type: 'spring', duration: theme.durations.level2, stiffness: 110 },
    y: 0,
  },
};

export default function MessageBox() {
  const message = useTypedSelector((state) => state.ui.message);
  const dispatch = useTypedDispatch();
  const onSetMessage = useCallback((msg: string) => dispatch(actions.setMessage(msg)), [dispatch]);

  return (
    <AnimatePresence mode="wait">
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
              $size="small"
              $color="#fff"
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
}
