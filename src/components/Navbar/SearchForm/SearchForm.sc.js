import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  max-width: 100%;
  width: 45rem;

  & .input-text {
    border: 1px solid ${({ theme }) => theme.colors.light3};
    font-size: 1.5rem;
    outline: none;
    padding: ${({ theme }) => theme.spacings.level1};
    width: 100%;
  }

  @media only screen and (max-width: 37.5em) {
    order: 2;
  }
`;