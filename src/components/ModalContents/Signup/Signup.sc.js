import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../../styled/theme';

export const Wrapper = styled.div`
  text-align: left;

  & .progress-bar-box {
    padding: 0 ${theme.spacings.level3};
  }
`;

export const Step = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;

  ${({ buttonsNumber }) => {
    if (buttonsNumber === 1) {
      return `
        justify-content: flex-end;
      `;
    }
    return `
      justify-content: space-between;
    `;
  }}
`;

export const stepFormVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: theme.durations.level1, delay: theme.durations.level1 },
  },
};
