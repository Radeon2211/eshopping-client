import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
${({ align }) => {
  if (align === 'left') {
    return `
      text-align: left;
    `;
  }
  if (align === 'center') {
    return `
      text-align: center;
    `;
  }
  if (align === 'right') {
    return `
      text-align: right;
    `;
  }
  return ``;
}}

${({ mgBottom, theme }) => {
  if (mgBottom === 'small') {
    return `
      margin-bottom: ${theme.spacings.level2};
    `;
  }
  if (mgBottom === 'medium') {
    return `
      margin-bottom: ${theme.spacings.level3};
    `;
  }
  if (mgBottom === 'big') {
    return `
      margin-bottom: ${theme.spacings.level4};
    `;
  }
  if (mgBottom === 'large') {
    return `
      margin-bottom: ${theme.spacings.level5};
    `;
  }
  return ``;
}}

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
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
