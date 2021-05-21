import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.sc';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

export default function Button(props) {
  const { clicked, isLoading, disabled, children } = props;

  const loadingOverlay = isLoading ? <LoadingOverlay loaderSize="small" disableText /> : null;

  return (
    <SC.Button {...props} onClick={clicked} disabled={disabled || isLoading}>
      {children}
      {loadingOverlay}
    </SC.Button>
  );
}

Button.defaultProps = {
  type: 'button',
  color: 'blue',
  filled: false,
  stretch: false,
  isLoading: false,
  disabled: false,
  clicked: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  stretch: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};
