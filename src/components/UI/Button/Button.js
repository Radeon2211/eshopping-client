import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.sc';

const Button = (props) => {
  const { children } = props;
  return <SC.Button {...props}>{children}</SC.Button>;
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  filled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  filled: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
