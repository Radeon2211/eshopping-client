import styled from 'styled-components';

export const GreenText = styled.span`
  color: ${({ theme }) => theme.colors.green} !important;
  transition: color ${({ theme }) => theme.durations.level1}s;

  &: hover {
    color: ${({ theme }) => theme.colors.greenDark} !important;
  }
`;

export const GrayText = styled.span`
  color: ${({ theme }) => theme.colors.light4};
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

export const AlignCenter = styled.div`
  text-align: center;
`;

export const UserDataValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.level3};
  word-break: break-all;
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
