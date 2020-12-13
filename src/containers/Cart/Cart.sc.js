import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const PayBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.level2};
  text-align: center;

  & .to-pay-text {
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }

  & .to-pay-value {
    font-size: 2.7rem;
    letter-spacing: 1px;
    margin-left: ${({ theme }) => theme.spacings.level1};
  }
`;
