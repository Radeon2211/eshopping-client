import React from 'react';
import * as SC from './Heading.sc';

const Heading = (props) => {
  const { children } = props;

  return <SC.Heading {...props}>{children}</SC.Heading>;
};

export default Heading;
