import React from 'react';
import styled, { css } from 'styled-components';

const StyledHeading = styled.h1`
  ${({ variant, theme }) => {
    if (variant === 'h1') {
      return `
        font-family: ${theme.fonts.logo};
        font-size: 5.2rem;
        letter-spacing: 1px;
        text-shadow: ${theme.shadows.level3};
      `;
    }
    if (variant === 'h2') {
      return `
        font-size: 3.5rem;
        font-family: ${theme.fonts.heading};
        letter-spacing: 2px;
        line-height: 1;
        text-shadow: ${theme.shadows.level3};
      `;
    }
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
