import styled from 'styled-components';

export const Wrapper = styled.div`
  & .nav {
    background-color: ${({ theme }) => theme.colors.light1};
    position: fixed;
    top: 6.2rem;
    left: 0;
    width: 100%;
    padding-bottom: ${({ theme }) => theme.spacings.level1};
    z-index: ${({ theme }) => theme.zIndexes.level3};
  }

  & .nav-list {
    display: flex;
    justify-content: center;
    list-style: none;
  }

  & .nav-link {
    border-bottom: 2px solid transparent;
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.level2};
    letter-spacing: 1px;
    padding: ${({ theme }) => theme.spacings.level2};
    text-transform: uppercase;
    transition: all ${({ theme }) => theme.durations.level1}s;

    &:hover {
      color: ${({ theme }) => theme.colors.green};
    }
  }

  & .nav-link-active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
    cursor: default;

    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  @media only screen and (max-width: 37.5em) {
    & .nav {
      top: 10.8rem;
    }

    & .nav-list {
      justify-content: center;
    }
  }

  @media only screen and (max-width: 24.5em) {
    & .nav-link {
      letter-spacing: 0;
    }
  }

  @media only screen and (max-width: 22.5em) {
    & .nav-link {
      font-size: ${({ theme }) => theme.fontSizes.level1};
      padding: ${({ theme }) => theme.spacings.level1};
    }
  }
`;

export const Routes = styled.div`
  ${({ extraMargin, theme }) => {
    if (extraMargin) {
      return `
        margin-top: ${theme.spacings.level5};
      `;
    }
    return ``;
  }}
`;

export const OrdersWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  width: 80rem;
`;
