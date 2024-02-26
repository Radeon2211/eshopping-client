import PropTypes from 'prop-types';
import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';
import { formatPrice } from '../../../shared/utility/utility';

export default function ToPayInfo({ value }) {
  return (
    <FlexWrapper
      $align="center"
      $justify="center"
      $wrap="wrap"
      $spacing="1"
      data-testid="ToPayInfo"
    >
      <PlainText $size="4">To pay</PlainText>
      <PlainText $size="6" $spacing="1px">
        {formatPrice(value)}
      </PlainText>
    </FlexWrapper>
  );
}

ToPayInfo.propTypes = {
  value: PropTypes.number.isRequired,
};
