import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import Heading from '../../../components/UI/Heading/Heading';
import Button from '../../../components/UI/Button/Button';
import DeliveryAddress from '../../../components/UI/DeliveryAddress/DeliveryAddress';
import FlexWrapper from '../../../components/UI/FlexWrapper';
import { ModalType } from '../../../shared/types/types';

export default function DeliveryAddressSection({ onSetModal }) {
  const deliveryAddress = useSelector((state) => state.auth.deliveryAddress);

  return (
    <PlainPanel data-testid="DeliveryAddressSection">
      <FlexWrapper $direction="column" $align="start" $spacing="level3">
        <Heading $variant="h4">Delivery address</Heading>
        <DeliveryAddress data={deliveryAddress} />
        <Button clicked={() => onSetModal(ModalType.CHANGE_DELIVERY_ADDRESS)}>
          Change address
        </Button>
      </FlexWrapper>
    </PlainPanel>
  );
}

DeliveryAddressSection.propTypes = {
  onSetModal: PropTypes.func.isRequired,
};
