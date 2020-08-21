import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductsTopbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level3};

  @media only screen and (max-width: 37.5em) {
    padding: 0;
  }
`;

export const ProductsBottombar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level3} 0 0;

  @media only screen and (max-width: 37.5em) {
    padding: 0;
  }
`;

export const FiltersToggler = styled.div`
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.light4};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1.4rem;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};

  & .label {
    margin: 0 ${({ theme }) => theme.spacings.level2} 0 ${({ theme }) => theme.spacings.level1};
  }
`;
