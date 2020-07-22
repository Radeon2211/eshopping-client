import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light1};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level5};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level5};
  }

  & .heading {
    margin-left: ${({ theme }) => theme.spacings.level1};
  }

  & .logo {
    width: 4.6rem;
  }

  & .header-link:link,
  & .header-link:visited,
  & .header-link:active,
  & .header-link:focus {
    color: #000;
    text-decoration: none;
  }

  .header {
    display: flex;
  }

  @media only screen and (max-width: 56.25em) {
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level4};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level4};
    }

    & .heading {
      display: none;
    }
  }

  @media only screen and (max-width: 37.5em) {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level3};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }

    & > *:nth-child(2) {
      margin-right: 0;
      margin-top: ${({ theme }) => theme.spacings.level2};
      width: 100%;
    }
  }
`;