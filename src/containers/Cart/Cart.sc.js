import styled from 'styled-components';

export const PayBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacings.level2};

  & .to-pay-text {
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }

  & .to-pay-value {
    font-size: ${({ theme }) => theme.fontSizes.level6};
    letter-spacing: 1px;
    margin-left: ${({ theme }) => theme.spacings.level1};
  }
`;

export const EmptyCart = styled.div`
  text-align: center;

  & .empty-cart-image {
    max-width: 100%;
    width: 50rem;
  }
`;
