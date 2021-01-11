import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from '../FlexWrapper';
import { UserDataValue } from '../../../styled/components';

const DeliveryAddress = (props) => {
  const { data } = props;
  const { firstName, lastName, street, zipCode, city, country, phone } = data;

  const rowValues = [`${firstName} ${lastName}`, street, `${zipCode} ${city}`, country, phone];

  return (
    <FlexWrapper direction="column" spacing="level1">
      {rowValues.map((value, idx) => (
        <UserDataValue key={idx}>{value}</UserDataValue>
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
