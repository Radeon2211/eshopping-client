import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Heading.sc';

const Heading = (props) => {
  const { children } = props;
  return <SC.Heading {...props}>{children}</SC.Heading>;
};

Heading.defaultProps = {
  align: 'left',
  mgBottom: '0',
  mgTop: '0',
  lineHeight: '',
};

Heading.propTypes = {
  align: PropTypes.string,
  mgBottom: PropTypes.string,
  mgTop: PropTypes.string,
  lineHeight: PropTypes.string,
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Heading;
