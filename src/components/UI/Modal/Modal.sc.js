import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacings.level2};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level4};
`;

export const Backdrop = styled(motion.div)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;

export const Popup = styled(motion.div)`
  background-color: #fff;
  border-radius: 1px;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacings.level3};
  position: relative;
  text-align: center;
  width: 55rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};

  & .close-icon {
    cursor: pointer;
    display: flex;
    position: absolute;
    top: ${({ theme }) => theme.spacings.level1};
    transform: rotate(45deg);
    right: ${({ theme }) => theme.spacings.level1};
  }
`;
