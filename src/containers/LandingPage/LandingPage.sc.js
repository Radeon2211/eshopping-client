import { motion } from 'framer-motion';
import styled from 'styled-components';
import theme from '../../styled/theme';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Gradient = styled.div`
  background-image: linear-gradient(
    to right bottom,
    ${theme.colors.blueLight},
    ${theme.colors.blue}
  );
  background-size: cover;
  height: 100%;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${theme.zIndexes.level1};
`;

export const BackgroundImage = styled.img`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const CentralPanel = styled(motion.div)`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 60rem;
  justify-content: center;
  padding: ${theme.spacings.level5} ${theme.spacings.level2};
  margin: 0 ${theme.spacings.level2};
  width: 60rem;
  z-index: ${theme.zIndexes.level2};

  @media only screen and (max-width: 37.5em) {
    border-radius: 15px;
    height: auto;
    max-width: 55rem;
    width: 100%;
  }
`;

export const Slogan = styled.div`
  & > h2 {
    display: flex;
    flex-direction: column;
  }
`;

export const panelVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.4,
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

export const panelItemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
