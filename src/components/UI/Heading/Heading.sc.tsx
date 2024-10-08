import styled from 'styled-components';
import { HeadingProps } from './Heading';
import { PropsWithChildren } from '../../../shared/types/types';

const StyledHeading = styled.h1<HeadingProps>`
  ${({ $variant, $fontSize, theme }) => {
    switch ($variant) {
      case 'h1':
        return `
          font-family: ${theme.fonts.logo};
          font-size: ${$fontSize === 'big' ? '4.4rem' : '3.3rem'};
          letter-spacing: 1px;
          text-shadow: ${theme.shadows.level2};
        `;
      case 'h2':
        return `
          font-size: 3.5rem;
          font-family: ${theme.fonts.heading};
          line-height: ${theme.lineHeights.level1};
          text-shadow: ${theme.shadows.level2};
        `;
      case 'h3':
        return `
          font-size: 2.4rem;
          font-family: ${theme.fonts.heading};
          line-height: ${theme.lineHeights.level1};
          margin-bottom: ${theme.spacings.level3};
        `;
      case 'h4':
        return `
          font-size: ${theme.fontSizes.level4};
          line-height: ${theme.lineHeights.level1};
        `;
      default:
        return ``;
    }
  }}

  margin-top: ${({ $mgTop, theme }) => ($mgTop ? theme.spacings[$mgTop] : '0')};
  text-align: ${({ $align }) => $align};

  ${({ $mgBottom, theme }) => {
    if ($mgBottom) {
      return `
        margin-bottom: ${theme.spacings[$mgBottom]};
      `;
    }
    return ``;
  }}

  ${({ $lineHeight, theme }) => {
    if ($lineHeight) {
      return `
        line-height: ${theme.lineHeights[$lineHeight]};
      `;
    }
    return ``;
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export function Heading({ $variant, ...rest }: PropsWithChildren<HeadingProps>) {
  return <StyledHeading as={$variant} $variant={$variant} {...rest} />;
}
