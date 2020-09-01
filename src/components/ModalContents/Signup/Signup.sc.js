import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  text-align: left;

  & .progress-bar-box {
    padding: 0 ${({ theme }) => theme.spacings.level3};
  }

  & .help-info-box {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-bottom: ${({ theme }) => theme.spacings.level3};
    padding: 0 ${({ theme }) => theme.spacings.level2};
    text-align: center;
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
