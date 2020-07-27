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
          line-height: 1;
          text-shadow: ${theme.shadows.level3};
        `;
      case 'h3':
        return `
          font-size: 2.4rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 1px;
          line-height: 1;
          margin-bottom: ${theme.spacings.level3};
        `;
    }
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
