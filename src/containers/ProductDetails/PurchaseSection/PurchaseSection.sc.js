import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;

  & > button:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
  }

  & .info-quantity-box {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
  }

  & .choose-quantity-box {
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacings.level3};
    display: flex;
  }

  & .quantity-number {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-left: ${({ theme }) => theme.spacings.level1};
  }

  & .not-able-to-add {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacings.level2};
    text-align: center;
  }
`;

export const InfoToSeller = styled.div`
  display: flex;
  flex-direction: column;

  & .quantity-box {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
  }

  & .quantity-text {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .text {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    font-weight: 700;
  }
`;
