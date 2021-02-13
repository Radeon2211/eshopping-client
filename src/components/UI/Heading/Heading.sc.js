import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'h1':
        return `
          font-family: ${theme.fonts.logo};
          font-size: 3.3rem;
          letter-spacing: 1px;
          text-shadow: ${theme.shadows.level3};
        `;
      case 'h2':
        return `
          font-size: 3.5rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 2px;
          line-height: ${theme.lineHeights.level1};
          text-shadow: ${theme.shadows.level3};
        `;
      case 'h3':
        return `
          font-size: 2.5rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 1px;
          line-height: ${theme.lineHeights.level1};
          margin-bottom: ${theme.spacings.level3};
        `;
      case 'h4':
        return `
          font-size: ${theme.fontSizes.level4};
          letter-spacing: 1px;
          line-height: ${theme.lineHeights.level1};
        `;
      default:
        return ``;
    }
  }}

  margin-top: ${({ mgTop, theme }) => (mgTop ? theme.spacings[`level${mgTop}`] : '0')};
  text-align: ${({ align }) => align};

  ${({ mgBottom, theme }) => {
    if (mgBottom) {
      const level = `level${mgBottom}`;
      return `
        margin-bottom: ${theme.spacings[level]};
      `;
    }
    return ``;
  }}

  ${({ lineHeight, theme }) => {
    if (lineHeight) {
      const level = `level${lineHeight}`;
      return `
        line-height: ${theme.lineHeights[level]};
      `;
    }
    return ``;
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
