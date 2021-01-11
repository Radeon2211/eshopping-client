import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.level3};
  margin: 0 auto;
  max-width: 100%;
  width: 80rem;

  & .total-price-wrapper {
    text-align: right;
    margin-top: ${({ theme }) => theme.spacings.level3};
  }

  & .total-price-text {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    letter-spacing: 1px;
    margin-right: ${({ theme }) => theme.spacings.level1};
  }

  & .total-price-value {
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }
`;
