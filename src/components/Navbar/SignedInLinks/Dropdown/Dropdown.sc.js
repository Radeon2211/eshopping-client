import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.light1};
  border: 1px solid ${({ theme }) => theme.colors.light3};
  border-radius: 1px;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacings.level2});
  transform: translateY(-10%);
  transition: all 0.2s;
  right: 0;
  width: 25rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: initial;
      transform: translateY(0);
    `}

  & .list {
    list-style: none;
  }

  & .item {
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
    }
  }

  & .link:link,
  & .link:visited {
    align-items: center;
    color: #000;
    display: flex;
    font-size: 1.4rem;
    justify-content: center;
    padding: ${({ theme }) => theme.spacings.level2};
    text-align: center;
    text-decoration: none;
    transition: color 0.1s;
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
      font-size: 1.5rem;
    }
  }
`;
