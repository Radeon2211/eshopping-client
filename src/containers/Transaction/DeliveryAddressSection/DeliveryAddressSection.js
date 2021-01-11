import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import Heading from '../../../components/UI/Heading/Heading';
import Button from '../../../components/UI/Button/Button';
import DeliveryAddress from '../../../components/UI/DeliveryAddress/DeliveryAddress';
import FlexWrapper from '../../../components/UI/FlexWrapper';

const DeliveryAddressSection = () => {
  const deliveryAddress = useSelector((state) => state.auth.deliveryAddress);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  return (
    <PlainPanel>
      <FlexWrapper direction="column" align="start">
        <Heading variant="h4">Delivery address</Heading>
        <DeliveryAddress data={deliveryAddress} />
        <Button clicked={() => onSetModal(true, modalTypes.CHANGE_DELIVERY_ADDRESS)}>
          Change address
        </Button>
      </FlexWrapper>
    </PlainPanel>
  );
};

export default DeliveryAddressSection;
