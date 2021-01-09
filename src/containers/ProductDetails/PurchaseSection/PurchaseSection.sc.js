import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > button:not(:last-child) {
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

  & .quantity-info {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }
`;
