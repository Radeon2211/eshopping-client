import PropTypes from 'prop-types';
import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';
import { formatPrice } from '../../../shared/utility/utility';

interface ToPayInfoProps {
  value: number;
}

export default function ToPayInfo({ value }: ToPayInfoProps) {
  return (
    <FlexWrapper
      $align="center"
      $justify="center"
      $wrap="wrap"
      $spacing="level1"
      data-testid="ToPayInfo"
    >
      <PlainText $size="level4">To pay</PlainText>
      <PlainText $size="level6" $spacing="1px">
        {formatPrice(value)}
      </PlainText>
    </FlexWrapper>
  );
}

ToPayInfo.propTypes = {
  value: PropTypes.number.isRequired,
};
