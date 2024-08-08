import styled from 'styled-components';

export const Wrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.light3};
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  text-align: center;

  & .social-link {
    align-items: center;
    display: flex;
  }

  & .about-website {
    color: ${({ theme }) => theme.colors.light4};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.level1};
    transition: color ${({ theme }) => theme.durations.level1}s;

    &:hover {
      color: #000;
    }
  }
`;
