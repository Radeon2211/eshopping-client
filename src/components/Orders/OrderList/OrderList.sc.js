import styled from 'styled-components';

export const List = styled.div`
  position: relative;
`;

export const SingleOrder = styled.div`
  padding: ${({ theme }) => theme.spacings.level3} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light3};

  &:first-child {
    padding-top: 0;
  }

  & .username {
    font-size: ${({ theme }) => theme.fontSizes.level3};
  }

  & .date {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .total-text {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    letter-spacing: 1px;
    margin-right: ${({ theme }) => theme.spacings.level1};
  }

  & .price {
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }
`;
