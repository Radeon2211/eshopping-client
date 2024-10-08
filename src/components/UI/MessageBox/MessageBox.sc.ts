import { motion } from 'framer-motion';
import styled from 'styled-components';
import theme from '../../../styled/theme';

export const Wrapper = styled(motion.div)`
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

export const Message = styled(motion.div)`
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
