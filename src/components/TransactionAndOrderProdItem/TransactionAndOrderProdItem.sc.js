import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacings.level3};
`;

export const NameAndPrice = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level1};
  }

  & .name {
    flex: 2;
    font-size: ${({ theme }) => theme.fontSizes.level3};

    & > a {
      transition: color ${({ theme }) => theme.durations.level1}s;

      &:hover {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  @media only screen and (max-width: 56.25em) {
    align-items: start;
    flex-direction: column;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 0;
      margin-bottom: ${({ theme }) => theme.spacings.level1};
    }

    & .name {
      flex: initial;
    }
  }
`;
