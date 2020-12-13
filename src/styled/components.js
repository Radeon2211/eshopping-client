import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const GreenText = styled.span`
  color: ${({ theme }) => theme.colors.green} !important;
  transition: color ${({ theme }) => theme.durations.level1}s;

  &: hover {
    color: ${({ theme }) => theme.colors.greenDark} !important;
  }
`;
