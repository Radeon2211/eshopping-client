import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  width: 45rem;
  max-width: 100%;

  & .input-text {
    font-size: 1.4rem;
    padding: 0 ${({ theme }) => theme.spacings.level1};
    border: 1px solid ${({ theme }) => theme.colors.light3};
    width: 100%;
    outline: none;
  }
`;