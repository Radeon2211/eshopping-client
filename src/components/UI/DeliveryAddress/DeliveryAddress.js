import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';

const DeliveryAddress = (props) => {
  const { data } = props;
  const { firstName, lastName, street, zipCode, city, country, phone } = data;

  const rowValues = [`${firstName} ${lastName}`, street, `${zipCode} ${city}`, country, phone];

  return (
    <FlexWrapper direction="column" spacing="1">
      {rowValues.map((value, idx) => (
        <PlainText key={idx} size="3" wordBreak="break-all">
          {value}
        </PlainText>
      ))}
    </FlexWrapper>
  );
};

DeliveryAddress.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeliveryAddress;