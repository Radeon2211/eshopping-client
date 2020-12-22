import styled from 'styled-components';

export const Wrapper = styled.div`
  & .clear-btn-box {
    text-align: center;
  }
`;

export const SingleSeller = styled.div`
  padding: ${({ theme }) => theme.spacings.level3} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.light3};
  }

  &:last-child {
    padding-bottom: 0;
  }

  & .seller {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-bottom: calc(0.5 * ${({ theme }) => theme.spacings.level2});
  }
`;
