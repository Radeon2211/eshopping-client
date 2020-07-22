import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.IconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  & > svg {
    fill: ${({ theme }) => theme.colors.light4};

    ${({ size }) => {
      if (size === 'small') {
        return `
          width: 1.7rem;
          height: 1.7rem;
        `;
      } else {
        return `
          width: 3.6rem;
          height: 3.6rem;
        `;
      }
    }}

    ${({ disabled, theme }) => {
      if (disabled) {
        return `
          fill: ${theme.colors.light3};
        `;
      }
    }}
  }
`;

const MyIcon = (props) => {
  const { children } = props;
  return  <SC.IconWrapper {...props}>{children}</SC.IconWrapper>;
};

MyIcon.defaultProps = {
  disabled: false,
};

MyIcon.propTypes = {
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MyIcon;
