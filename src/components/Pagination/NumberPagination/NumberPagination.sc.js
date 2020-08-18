import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.5rem;

  & .arrow {
    align-items: center;
    align-self: stretch;
    cursor: pointer;
    display: flex;
    padding: 0 ${({ theme }) => theme.spacings.level1};
  }

  & .ellipsis {
    margin: 0 ${({ theme }) => theme.spacings.level1};
    letter-spacing: 1px;
  }

  & .of {
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }

  & .number-link {
    padding: ${({ theme }) => theme.spacings.level1};
    transition: color 0.1s;

    &:hover {
      color: ${({ theme }) => theme.colors.green};
    }

    &.active {
      color: ${({ theme }) => theme.colors.blueLight};
      font-weight: 700;

      &:hover {
        color: ${({ theme }) => theme.colors.blueLight};
        cursor: default;
      }
    }
  }
`;
