import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const SC = {};
SC.Button = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 1px;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  letter-spacing: 1px;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  text-transform: uppercase;
  transition: background-color .1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueLight};
  }

  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        background-color: ${theme.colors.blueDark};
        color: ${theme.colors.light1};
        cursor: default;

        &:hover {
          background-color: ${theme.colors.blueDark};
        }
      `;
    }
  }}
`;

const Button = (props) => {
  const { type, disabled, children } = props;
  return <SC.Button type={type} disabled={disabled}>{children}</SC.Button>;
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
