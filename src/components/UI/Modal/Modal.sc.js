import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  z-index: ${({ theme }) => theme.zIndexes.level3};
`;

export const Popup = styled(motion.div)`
  background-color: #fff;
  border-radius: 1px;
  left: 50%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  position: fixed;
  text-align: center;
  width: 45rem;
  z-index: ${({ theme }) => theme.zIndexes.level4};

  & .close-icon-box {
    border: 2px solid ${({ theme }) => theme.colors.light4};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    padding: 0.5rem;
    position: absolute;
    top: ${({ theme }) => theme.spacings.level1};
    right: ${({ theme }) => theme.spacings.level1};
  }

  & .close-icon {
    transform: rotate(45deg);
  }
`;
