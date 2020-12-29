import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .nav {
    margin-bottom: ${({ theme }) => theme.spacings.level4};
  }

  & .nav-list {
    display: flex;
    list-style: none;
  }

  & .nav-link {
    border-bottom: 2px solid transparent;
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
