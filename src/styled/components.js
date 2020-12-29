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

export const AlignCenter = styled.div`
  text-align: center;
`;
