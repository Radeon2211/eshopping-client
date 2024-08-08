import PropTypes from 'prop-types';
import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';
import * as propTypes from '../../../shared/propTypes';

export default function DeliveryAddress({ data }) {
  const { firstName, lastName, street, zipCode, city, country, phone } = data;

  const rowValues = [`${firstName} ${lastName}`, street, `${zipCode} ${city}`, country, phone];

  return (
    <FlexWrapper $direction="column" $spacing="level1">
      {rowValues.map((value, idx) => (
        <PlainText key={idx} $size="level3" $wordBreak="break-all">
          {value}
        </PlainText>
      ))}
    </FlexWrapper>
  );
}

DeliveryAddress.propTypes = {
  data: PropTypes.shape(propTypes.deliveryAddressStrings).isRequired,
};
