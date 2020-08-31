import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SearchForm = styled.form`
  display: flex;
  max-width: 100%;
  width: 45rem;

  & .input-text {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 1px solid ${({ theme }) => theme.colors.light3};
    font-size: ${({ theme }) => theme.fontSizes.level3};
    outline: none;
    padding: ${({ theme }) => theme.spacings.level1};
    width: 100%;
  }

  @media only screen and (max-width: 37.5em) {
    order: 2;
  }
`;
