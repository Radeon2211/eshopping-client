import styled from 'styled-components';

export const GreenText = styled.span`
  color: ${({ theme }) => theme.colors.green} !important;
  transition: color ${({ theme }) => theme.durations.level1}s;

  &:hover {
    color: ${({ theme }) => theme.colors.greenDark} !important;
    cursor: pointer;
  }
`;

export const TopPagination = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level2} 0 0;

  @media only screen and (max-width: 37.5em) {
    padding: 0;
  }
`;
