import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Loader.sc';

export default function Loader({ size, align }) {
  const loader = (
    <SC.Loader $size={size} data-testid="Loader">
      <div />
      <div />
      <div />
      <div />
    </SC.Loader>
  );

  let wrapper = null;
  if (align) {
    wrapper = (
      <SC.Wrapper $align={align} data-testid="LoaderWrapper">
        {loader}
      </SC.Wrapper>
    );
  } else {
    wrapper = loader;
  }

  return wrapper;
}

Loader.defaultProps = {
  align: '',
  size: '',
};

Loader.propTypes = {
  align: PropTypes.string,
  size: PropTypes.string,
};
