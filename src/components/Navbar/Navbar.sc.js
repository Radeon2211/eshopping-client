import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level4};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level4};

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level4};
  }

  & .heading {
    margin-left: ${({ theme }) => theme.spacings.level1};
  }

  & .logo {
    width: 4.6rem;
  }

  .header {
    display: flex;
  }

  @media only screen and (max-width: 75em) {
    & .heading {
      display: none;
    }
  }

  @media only screen and (max-width: 56.25em) {
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level3};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }

  @media only screen and (max-width: 37.5em) {
    flex-wrap: wrap;
    justify-content: space-between;

    & > *:nth-child(2) {
      margin-right: 0;
      margin-top: ${({ theme }) => theme.spacings.level1};
      width: 100%;
    }
  }
`;
