import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Heading.sc';

const Heading = React.memo((props) => <SC.Heading {...props}>{props.children}</SC.Heading>);

Heading.defaultProps = {
  align: 'left',
  mgBottom: '',
  mgTop: '',
  lineHeight: '',
  fontSize: '',
};

Heading.propTypes = {
  align: PropTypes.string,
  mgBottom: PropTypes.string,
  mgTop: PropTypes.string,
  lineHeight: PropTypes.string,
  variant: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Heading;
