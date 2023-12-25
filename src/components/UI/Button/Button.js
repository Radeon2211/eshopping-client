import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.sc';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

export default function Button(props) {
  const { clicked, isLoading, disabled, children, ...rest } = props;

  const loadingOverlay = isLoading ? <LoadingOverlay loaderSize="small" disableText /> : null;

  return (
    <SC.Button {...rest} onClick={clicked} disabled={disabled || isLoading}>
      {children}
      {loadingOverlay}
    </SC.Button>
  );
}

Button.defaultProps = {
  $size: 'small',
  type: 'button',
  $color: 'blue',
  $filled: false,
  $stretch: false,
  isLoading: false,
  disabled: false,
  clicked: () => {},
};

Button.propTypes = {
  $size: PropTypes.string,
  type: PropTypes.string,
  $color: PropTypes.string,
  $filled: PropTypes.bool,
  $stretch: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};
