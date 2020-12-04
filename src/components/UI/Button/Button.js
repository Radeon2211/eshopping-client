import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.sc';

const Button = (props) => {
  const { clicked, children } = props;
  return (
    <SC.Button onClick={clicked} {...props}>
      {children}
    </SC.Button>
  );
};

Button.defaultProps = {
  type: 'button',
  color: 'blue',
  filled: false,
  disabled: false,
  clicked: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;