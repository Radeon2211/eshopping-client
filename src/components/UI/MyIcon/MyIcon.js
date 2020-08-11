import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.IconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  & > svg {
    ${({ color, theme }) => {
      if (color) {
        return `
          fill: ${color};
        `;
      }
      return `
          fill: ${theme.colors.light4};
        `;
    }}

    ${({ size }) => {
      if (size === 'small') {
        return `
          width: 1.7rem;
          height: 1.7rem;
        `;
      }
      if (size === 'medium') {
        return `
          width: 2.5rem;
          height: 2.5rem;
        `;
      }
      return `
          width: 3.6rem;
          height: 3.6rem;
        `;
    }}

    ${({ disabled, theme }) => {
      if (disabled) {
        return `
          fill: ${theme.colors.light3};
        `;
      }
      return ``;
    }}
  }
`;

const MyIcon = (props) => {
  const { children } = props;
  return <SC.IconWrapper {...props}>{children}</SC.IconWrapper>;
};

MyIcon.defaultProps = {
  disabled: false,
  color: '',
};

MyIcon.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MyIcon;
