import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import Heading from '../../../components/UI/Heading/Heading';
import Button from '../../../components/UI/Button/Button';
import FlexWrapper from '../../../components/UI/FlexWrapper';
import { UserDataValue } from '../../../styled/components';

const DeliveryAddress = () => {
  const deliveryAddress = useSelector((state) => state.auth.deliveryAddress);
  const { firstName, lastName, street, zipCode, city, country, phone } = deliveryAddress;

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  const rowValues = [`${firstName} ${lastName}`, street, `${zipCode} ${city}`, country, phone];

  return (
    <PlainPanel>
      <FlexWrapper direction="column" align="start">
        <Heading variant="h4">Delivery address</Heading>
        <FlexWrapper direction="column" spacing="level1">
          {rowValues.map((value, idx) => (
            <UserDataValue key={idx}>{value}</UserDataValue>
          ))}
        </FlexWrapper>
        <Button clicked={() => onSetModal(true, modalTypes.CHANGE_DELIVERY_ADDRESS)}>
          Change address
        </Button>
      </FlexWrapper>
    </PlainPanel>
  );
};

export default DeliveryAddress;
