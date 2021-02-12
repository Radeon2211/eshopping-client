import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from './FlexWrapper';
import PlainText from './PlainText';
import { formatPrice } from '../../shared/utility';

const ToPayInfo = (props) => {
  const { value } = props;

  return (
    <FlexWrapper align="center" justify="center" wrap="wrap" spacing="1">
      <PlainText size="4">To pay</PlainText>
      <PlainText size="6" spacing="1px">
        {formatPrice(value)}
      </PlainText>
    </FlexWrapper>
  );
};

ToPayInfo.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ToPayInfo;
