import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductsTopbar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level3} 0 0;

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
