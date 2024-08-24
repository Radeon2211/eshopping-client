import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';
import { DeliveryAddress as IDeliveryAddress } from '../../../shared/types/types';

export default function DeliveryAddress({ data }: { data: IDeliveryAddress }) {
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
