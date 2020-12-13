import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  margin-bottom: ${({ mgBottom, theme }) => (mgBottom ? theme.spacings[mgBottom] : mgBottom)};
  text-align: ${({ align }) => align};

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
          line-height: 1;
          text-shadow: ${theme.shadows.level3};
        `;
      case 'h3':
        return `
          font-size: 2.5rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 1px;
          line-height: 1;
          margin-bottom: ${theme.spacings.level3};
        `;
      case 'h4':
        return `
          font-size: ${theme.fontSizes.level4};
          line-height: 1;
          text-align: center;
        `;
      default:
        return ``;
    }
  }}

  ${({ lineHeight }) => {
    if (lineHeight === 'small') {
      return `
        line-height: 1.15;
      `;
    }
    if (lineHeight === 'medium') {
      return `
        line-height: 1.3;
      `;
    }
    if (lineHeight === 'big') {
      return `
        line-height: 1.45;
      `;
    }
    return ``;
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
