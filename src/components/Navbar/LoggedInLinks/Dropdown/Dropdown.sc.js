import styled from 'styled-components';
import { motion } from 'framer-motion';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light1};
  border: 1px solid ${({ theme }) => theme.colors.light3};
  border-radius: 1px;
  overflow: hidden;
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacings.level2});
  transition: all ${({ theme }) => theme.durations.level2};
  right: 0;
  width: 25rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};

  & .list {
    list-style: none;
  }

  & .item {
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
    }
  }

  & .link,
  & .link:link,
  & .link:visited {
    align-items: center;
    color: #000;
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.level2};
    justify-content: center;
    padding: calc(1.5 * ${({ theme }) => theme.spacings.level2});
    text-align: center;
    text-decoration: none;
    transition: color ${({ theme }) => theme.durations.level1}s;
    width: 100%;

    &:hover {
      color: ${({ theme }) => theme.colors.green};
    }

    & > *:not(:first-child) {
      margin-left: ${({ theme }) => theme.spacings.level1};
    }
  }

  @media only screen and (max-width: 37.5em) {
    & .link:link,
    & .link:visited {
      font-size: ${({ theme }) => theme.fontSizes.level3};
    }
  }
`;
