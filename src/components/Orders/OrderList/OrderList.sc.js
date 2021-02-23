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
`;
